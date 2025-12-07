const API_URL =
  import.meta.env.VITE_COMPANY_DOCS_API_URL ||
  "https://trafosanf-remake.vercel.app/api/company-docs";

export interface CompanyDocsResponse {
  companyId: string;
  displayName: string;
  fileNames: string[];
  combinedText: string;
}

const fetchJson = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  const data = await response.json();

  if (!response.ok) {
    const error = data?.error || response.statusText;
    throw new Error(error);
  }

  return data;
};

export const fetchCompanyDocuments = async (
  companyId: string
): Promise<CompanyDocsResponse> => {
  const data = await fetchJson(`${API_URL}?companyId=${encodeURIComponent(companyId)}`);
  return data;
};

