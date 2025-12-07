const SUMMARY_LIMIT = 2000;

export const summarizeText = (text: string, maxLength: number = SUMMARY_LIMIT): string => {
  if (!text) return "";

  const clean = text
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  return `${clean.slice(0, maxLength)}...\n[gekürzt]`;
};

