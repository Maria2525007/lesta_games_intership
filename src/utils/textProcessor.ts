import { WordData } from '../types';

export function processTextFile(text: string): WordData[] {

  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0 && !/^\d+$/.test(word));

  // Count occurrences of each word
  const wordCount: Record<string, number> = {};
  const totalWords = words.length;

  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Get unique words
  const uniqueWords = Object.keys(wordCount);

  // Calculate TF (term frequency) and IDF (inverse document frequency)
  const wordData: WordData[] = uniqueWords.map(word => {
    const tf = wordCount[word]; // Term frequency is just the count in this context

    const idf = Math.log(totalWords / wordCount[word]);
    
    return {
      word,
      tf,
      idf
    };
  });

  // Sort by IDF (decreasing) and take the top 50
  return wordData
    .sort((a, b) => b.idf - a.idf)
    .slice(0, 50);
}