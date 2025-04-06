import api from './api';
import { StudySession } from './sessionsApi';

// Define interfaces for the dashboard data
export interface DashboardStats {
  wordsLearned: number;
  totalSessions: number;
  studyHours: number;
  lastSession?: StudySession;
}

const dashboardApi = {
  // Get dashboard statistics
  getStats: () => 
    api.get<DashboardStats>('/dashboard/stats'),
    
  // Get recent progress data
  getProgress: (days: number = 7) => 
    api.get<{ dates: string[], counts: number[] }>(`/dashboard/progress?days=${days}`),
};

export default dashboardApi; 