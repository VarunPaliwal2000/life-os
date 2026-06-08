export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/api/events`,
  HEALTH: `${API_BASE_URL}/life/health`,
} as const;
