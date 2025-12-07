const PROXY_BASE = "https://r.jina.ai";

const ensureProtocol = (value: string): string => {
  if (!value) throw new Error("Bitte gib eine gültige URL ein.");
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://${value}`;
};

export interface SiteContentResult {
  url: string;
  text: string;
}

export const fetchWebsiteContent = async (rawUrl: string): Promise<SiteContentResult> => {
  try {
    const normalized = new URL(ensureProtocol(rawUrl)).toString();
    const proxiedUrl = `${PROXY_BASE}/${normalized}`;
    const response = await fetch(proxiedUrl);

    if (!response.ok) {
      throw new Error("Die Website konnte nicht geladen werden. Bitte versuche es mit einem anderen Link.");
    }

    const text = await response.text();

    if (!text || text.trim().length < 200) {
      throw new Error("Auf der Website wurde kein verwertbarer Text gefunden.");
    }

    return { url: normalized, text };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Die URL ist ungültig. Bitte überprüfe den Link.");
    }
    throw error;
  }
};

