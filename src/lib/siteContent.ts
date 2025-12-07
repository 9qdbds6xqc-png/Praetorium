import { summarizeText } from "./textSummary";

const PROXY_BASE = "https://r.jina.ai";
const MAX_PAGES = 500;

const ensureProtocol = (value: string): string => {
  if (!value) throw new Error("Bitte gib eine gültige URL ein.");
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://${value}`;
};

const proxyFetch = async (targetUrl: string) => {
  const proxiedUrl = `${PROXY_BASE}/${targetUrl}`;
  const response = await fetch(proxiedUrl);

  if (!response.ok) {
    throw new Error("Die Website konnte nicht geladen werden. Bitte versuche es mit einem anderen Link.");
  }

  const text = await response.text();

  if (!text || text.trim().length < 200) {
    throw new Error("Auf der Website wurde kein verwertbarer Text gefunden.");
  }

  return text;
};

const extractSubLinks = (html: string, baseUrl: URL): string[] => {
  const hrefRegex = /href=["']([^"'#]+)["']/gi;
  const links = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = hrefRegex.exec(html)) !== null) {
    try {
      const href = match[1];
      const absoluteUrl = new URL(href, baseUrl).toString();

      if (new URL(absoluteUrl).hostname === baseUrl.hostname) {
        links.add(absoluteUrl);
      }
    } catch {
      // ignore parsing errors
    }
  }

  return Array.from(links);
};

const fetchSitemapLinks = async (baseUrl: URL): Promise<string[]> => {
  try {
    const sitemapUrl = new URL("/sitemap.xml", baseUrl.origin).toString();
    const response = await fetch(sitemapUrl);
    if (!response.ok) return [];

    const xml = await response.text();
    const locRegex = /<loc>(.*?)<\/loc>/gi;
    const links = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = locRegex.exec(xml)) !== null) {
      try {
        const loc = match[1].trim();
        const absoluteUrl = new URL(loc, baseUrl).toString();
        if (new URL(absoluteUrl).hostname === baseUrl.hostname) {
          links.add(absoluteUrl);
        }
      } catch {
        // ignore malformed urls
      }
    }

    return Array.from(links);
  } catch {
    return [];
  }
};

export interface SiteContentResult {
  url: string;
  text: string;
}

export const fetchWebsiteContent = async (rawUrl: string): Promise<SiteContentResult> => {
  try {
    const normalizedUrl = ensureProtocol(rawUrl);
    const baseUrl = new URL(normalizedUrl);
    const sitemapLinks = await fetchSitemapLinks(baseUrl);
    const seedLinks = [baseUrl.toString(), ...sitemapLinks];
    const queue: string[] = Array.from(new Set(seedLinks));
    const visited = new Set<string>();
    const collected: Array<{ link: string; content: string }> = [];

    while (queue.length > 0 && visited.size < MAX_PAGES) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;

      try {
        const content = await proxyFetch(current);
        collected.push({ link: current, content });
        visited.add(current);

        const discoveredLinks = extractSubLinks(content, new URL(current));
        for (const link of discoveredLinks) {
          if (!visited.has(link) && queue.length + visited.size < MAX_PAGES) {
            queue.push(link);
          }
        }
      } catch (error) {
        console.warn("Seitenabruf fehlgeschlagen:", current, error);
      }
    }

    if (collected.length === 0) {
      throw new Error("Es konnten keine Inhalte geladen werden.");
    }

    const combinedText = collected
      .map((entry) => {
        const summarized = summarizeText(entry.content);
        return `\n\n---\n\nURL: ${entry.link}\n${summarized}`;
      })
      .join("");

    return { url: baseUrl.toString(), text: combinedText };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Die URL ist ungültig. Bitte überprüfe den Link.");
    }
    throw error;
  }
};

