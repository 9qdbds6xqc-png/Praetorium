const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL ||
  "https://trafosanf-remake.vercel.app/api/openai";

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AnswerResult {
  answer: string;
  isPricingQuestion: boolean;
  confidence?: number;
}

export async function askQuestion(
  question: string,
  websiteContext: string,
  chatHistory: ChatMessage[] = [],
  sourceUrl?: string
): Promise<AnswerResult> {
  try {
    // Check if this is a pricing-related question
    const pricingKeywords = ['price', 'cost', 'pricing', 'purchase', 'buy', 'payment', 'fee', 'costs', 'preis', 'kosten'];
    const isPricingQuestion = pricingKeywords.some(keyword => 
      question.toLowerCase().includes(keyword)
    );

    if (!CHAT_API_URL) {
      throw new Error('Chat API URL is not configured. Please set VITE_CHAT_API_URL.');
    }

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context: websiteContext,
        chatHistory,
        sourceUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Antwort konnte nicht geladen werden.');
    }

    const data = await response.json();
    const answer =
      data.answer ||
      'Sorry, ich konnte keine Antwort generieren. Bitte versuche es erneut.';

    return {
      answer,
      isPricingQuestion,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to get answer. Please try again later.');
  }
}

export function preparePDFContext(pdfText: string, maxLength: number = 4000): string {
  // If PDF text is too long, truncate intelligently
  if (pdfText.length > maxLength) {
    return pdfText.substring(0, maxLength) + '...\n[Content truncated]';
  }
  return pdfText;
}

