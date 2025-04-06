import api from './api';

// Define interfaces for the response types
export interface StudyActivity {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url?: string;
}

export interface ActivitiesResponse {
  activities: StudyActivity[];
  total: number;
  page: number;
  pages: number;
}

export interface ActivityDetailResponse {
  activity: StudyActivity;
}

const activitiesApi = {
  // Get all study activities
  getActivities: (page: number = 1, limit: number = 10) => 
    api.get<ActivitiesResponse>(`/study-activities?page=${page}&limit=${limit}`),

  // Get a single activity by ID
  getActivity: (id: number) => 
    api.get<ActivityDetailResponse>(`/study-activities/${id}`),

  // Start a study activity and create a session
  startActivity: (activityId: number, groupId: number) => 
    api.post<{ sessionId: number; url: string }>('/study-activities/start', { 
      activityId, 
      groupId,
      startTime: new Date().toISOString()
    }),
};

export default activitiesApi; 