/**
 * Search through PDF content for relevant sections based on keywords
 */
export function findRelevantSections(text: string, question: string, maxSections: number = 3): string {
  const questionLower = question.toLowerCase();
  const keywords = questionLower.split(/\s+/).filter(word => word.length > 3);
  
  const sentences = text.split(/[.!?]+\s+/);
  const relevantSentences: string[] = [];
  
  for (const sentence of sentences) {
    const sentenceLower = sentence.toLowerCase();
    const relevanceScore = keywords.reduce((score, keyword) => {
      return score + (sentenceLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (relevanceScore > 0) {
      relevantSentences.push(sentence);
    }
  }
  
  // Return most relevant sections (up to maxSections sentences)
  return relevantSentences.slice(0, maxSections).join('. ') + '.';
}

