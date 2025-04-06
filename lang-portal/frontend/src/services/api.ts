/**
 * Base API service for making requests to the backend
 */

// Base API URL - in production, this would point to your deployed backend
// In development, we'll use a proxy (configured in vite.config.ts)
const API_BASE_URL = '/api';

// Default request options
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Generic request function
async function request<T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any,
  customOptions: RequestInit = {}
): Promise<T> {
  // Build the full URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Merge options with defaults
  const options: RequestInit = {
    ...defaultOptions,
    ...customOptions,
    method,
  };
  
  // Add body data if provided
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }
    
    // Parse JSON response
    const result = await response.json();
    return result as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Export convenience methods for different HTTP methods
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, 'GET', undefined, options),
  post: <T>(endpoint: string, data: any, options?: RequestInit) => request<T>(endpoint, 'POST', data, options),
  put: <T>(endpoint: string, data: any, options?: RequestInit) => request<T>(endpoint, 'PUT', data, options),
  delete: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, 'DELETE', undefined, options),
};

export default api; 