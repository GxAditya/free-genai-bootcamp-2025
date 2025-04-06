import api from './api';
import { Word } from './wordsApi';

// Define interfaces for the response types
export interface WordGroup {
  id: number;
  name: string;
  description?: string;
  wordCount: number;
}

export interface GroupsResponse {
  groups: WordGroup[];
  total: number;
  page: number;
  pages: number;
}

export interface GroupDetailResponse {
  group: WordGroup;
  words: Word[];
}

const groupsApi = {
  // Get all word groups with pagination
  getGroups: (page: number = 1, limit: number = 10) => 
    api.get<GroupsResponse>(`/groups?page=${page}&limit=${limit}`),

  // Get a single group by ID
  getGroup: (id: number) => 
    api.get<GroupDetailResponse>(`/groups/${id}`),

  // Create a new word group
  createGroup: (groupData: Omit<WordGroup, 'id' | 'wordCount'>) => 
    api.post<GroupDetailResponse>('/groups', groupData),

  // Update an existing word group
  updateGroup: (id: number, groupData: Partial<Omit<WordGroup, 'id' | 'wordCount'>>) => 
    api.put<GroupDetailResponse>(`/groups/${id}`, groupData),

  // Delete a word group
  deleteGroup: (id: number) => 
    api.delete(`/groups/${id}`),
    
  // Add a word to a group
  addWordToGroup: (groupId: number, wordId: number) => 
    api.post<GroupDetailResponse>(`/groups/${groupId}/words`, { wordId }),
    
  // Remove a word from a group
  removeWordFromGroup: (groupId: number, wordId: number) => 
    api.delete<GroupDetailResponse>(`/groups/${groupId}/words/${wordId}`),
};

export default groupsApi; 