// EngineLabs.ai Configuration

export const ENGINELABS_BASE_URL = import.meta.env.VITE_ENGINELABS_BASE_URL;
export const ENGINELABS_API_KEY = import.meta.env.VITE_ENGINELABS_API_KEY;

export const COLLECTIONS = {
  USERS: 'users',
  DETECTION_AREAS: 'detection_areas',
  ITEMS: 'items',
  FEEDBACK: 'feedback',
  ANALYTICS: 'analytics',
  LOGS: 'logs',
};

export const ENDPOINTS = {
  MODEL_TRAINING: '/model-training',
  NOTIFICATIONS: '/notifications',
  CUSTOM_ENDPOINTS: '/custom-endpoints',
};

export const getHeaders = () => ({
  'Authorization': `Bearer ${ENGINELABS_API_KEY}`,
  'Content-Type': 'application/json',
});