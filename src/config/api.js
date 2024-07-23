// API Configuration

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const COLLECTIONS = {
  USERS: 'users',
  DETECTION_AREAS: 'detection_areas',
  ITEMS: 'items',
};

export const ENDPOINTS = {
  MODEL_TRAINING: '/model-training',
  LOGIN: '/login',
};

export const getHeaders = () => ({
  'x-apikey': API_TOKEN,
  'Content-Type': 'application/json',
});