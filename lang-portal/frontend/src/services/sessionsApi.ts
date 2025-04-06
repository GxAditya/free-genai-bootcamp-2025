import api from './api';

// Define interfaces for the response types
export interface StudySession {
  id: number;
  activityId: number;
  activityName: string;
  groupId: number;
  groupName: string;
  startTime: string;
  endTime: string;
  reviewItems: number;
}

export interface SessionsResponse {
  sessions: StudySession[];
  total: number;
  page: number;
  pages: number;
}

export interface SessionDetailResponse {
  session: StudySession;
}

// Interface for creating a new session
export interface CreateSessionData {
  activityId: number;
  groupId: number;
  startTime: string;
  endTime?: string;
  reviewItems?: number;
}

const sessionsApi = {
  // Get all study sessions with pagination
  getSessions: (page: number = 1, limit: number = 10) => 
    api.get<SessionsResponse>(`/study-sessions?page=${page}&limit=${limit}`),

  // Get a single session by ID
  getSession: (id: number) => 
    api.get<SessionDetailResponse>(`/study-sessions/${id}`),

  // Create a new study session
  createSession: (sessionData: CreateSessionData) => 
    api.post<SessionDetailResponse>('/study-sessions', sessionData),

  // Update an existing study session
  updateSession: (id: number, sessionData: Partial<Omit<StudySession, 'id'>>) => 
    api.put<SessionDetailResponse>(`/study-sessions/${id}`, sessionData),

  // Delete a study session
  deleteSession: (id: number) => 
    api.delete(`/study-sessions/${id}`),
    
  // Get user study statistics
  getStats: () => 
    api.get('/study-sessions/stats'),
};

export default sessionsApi; 