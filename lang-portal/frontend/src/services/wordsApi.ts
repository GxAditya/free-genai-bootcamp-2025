import api from './api';

// Define interfaces for the response types
export interface Word {
  id: number;
  hindi: string;
  transliteration: string;
  english: string;
  correct: number;
  wrong: number;
}

export interface WordsResponse {
  words: Word[];
  total: number;
  page: number;
  pages: number;
}

export interface WordDetailResponse {
  word: Word;
}

const wordsApi = {
  // Get all words with pagination
  getWords: (page: number = 1, limit: number = 10) => 
    api.get<WordsResponse>(`/words?page=${page}&limit=${limit}`),

  // Get a single word by ID
  getWord: (id: number) => 
    api.get<WordDetailResponse>(`/words/${id}`),

  // Create a new word
  createWord: (wordData: Omit<Word, 'id' | 'correct' | 'wrong'>) => 
    api.post<WordDetailResponse>('/words', wordData),

  // Update an existing word
  updateWord: (id: number, wordData: Partial<Omit<Word, 'id'>>) => 
    api.put<WordDetailResponse>(`/words/${id}`, wordData),

  // Delete a word
  deleteWord: (id: number) => 
    api.delete(`/words/${id}`),
};

export default wordsApi; 