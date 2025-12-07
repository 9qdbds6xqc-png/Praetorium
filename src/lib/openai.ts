// OpenAI API integration using direct fetch calls
// This works without installing the OpenAI SDK package

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AnswerResult {
  answer: string;
  isPricingQuestion: boolean;
  confidence?: number;
}

// Rate limiting: Track last request time
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // Minimum 2 seconds between requests

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Ask a question using OpenAI with PDF context
 */
export async function askQuestion(
  question: string,
  pdfContext: string,
  chatHistory: ChatMessage[] = []
): Promise<AnswerResult> {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment variables.');
    }

    // Check if this is a pricing-related question
    const pricingKeywords = ['price', 'cost', 'pricing', 'purchase', 'buy', 'payment', 'fee', 'costs', 'preis', 'kosten'];
    const isPricingQuestion = pricingKeywords.some(keyword => 
      question.toLowerCase().includes(keyword)
    );

    // System prompt - STRICT: Only answer from PDF content
    const systemPrompt = `You are a helpful assistant answering questions STRICTLY based on the provided PDF documentation.

CRITICAL RULES:
1. ONLY answer questions that can be answered using information from the provided PDF content.
2. If the question cannot be answered from the PDF, you MUST respond with: "Diese Frage kann ich nicht basierend auf dem bereitgestellten Dokument beantworten. Bitte kontaktieren Sie uns direkt für weitere Informationen."
3. For pricing questions, you MUST respond: "Preisinformationen können Sie über unser Kontaktformular anfordern."
4. Do NOT make up information or use general knowledge.
5. Only use facts explicitly stated in the PDF.
6. Keep answers clear, professional, and under 300 words.
7. Respond in the same language as the question (English or German).`;

    // Build messages array
    const messages: Array<{ role: string; content: string }> = [
      {
        role: 'system',
        content: systemPrompt,
      },
    ];

    // Add chat history for context (last 4 messages)
    if (chatHistory.length > 0) {
      const recentHistory = chatHistory.slice(-4);
      messages.push(...recentHistory);
    }

    // Add current question with context
    messages.push({
      role: 'user',
      content: `Documentation context:\n\n${pdfContext}\n\n\nQuestion: ${question}`,
    });

    // Rate limiting: Wait if requests are too frequent
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      await delay(waitTime);
    }
    lastRequestTime = Date.now();

    // Retry logic for rate limits
    const makeRequest = async (retryCount = 0): Promise<Response> => {
      const maxRetries = 3;
      const baseDelay = 1000; // 1 second base delay

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        // Handle rate limit with retry
        if (response.status === 429 && retryCount < maxRetries) {
          const retryAfter = response.headers.get('retry-after');
          const waitTime = retryAfter 
            ? parseInt(retryAfter) * 1000 
            : baseDelay * Math.pow(2, retryCount); // Exponential backoff
          
          console.log(`Rate limited. Retrying after ${waitTime}ms (attempt ${retryCount + 1}/${maxRetries})...`);
          await delay(waitTime);
          return makeRequest(retryCount + 1);
        }

        return response;
      } catch (error) {
        if (retryCount < maxRetries) {
          const waitTime = baseDelay * Math.pow(2, retryCount);
          console.log(`Request failed. Retrying after ${waitTime}ms (attempt ${retryCount + 1}/${maxRetries})...`);
          await delay(waitTime);
          return makeRequest(retryCount + 1);
        }
        throw error;
      }
    };

    const response = await makeRequest();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error('OpenAI API key is invalid. Please check your configuration.');
      }
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        const waitSeconds = retryAfter ? parseInt(retryAfter) : 60;
        throw new Error(`Rate limit exceeded. Please wait ${waitSeconds} seconds before trying again.`);
      }
      
      throw new Error(errorData.error?.message || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'Sorry, I could not generate an answer. Please try again.';

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

/**
 * Extract text from a simple context string (PDF content passed as string)
 */
export function preparePDFContext(pdfText: string, maxLength: number = 4000): string {
  // If PDF text is too long, truncate intelligently
  if (pdfText.length > maxLength) {
    return pdfText.substring(0, maxLength) + '...\n[Content truncated]';
  }
  return pdfText;
}

