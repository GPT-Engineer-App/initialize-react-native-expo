// API Configuration for Codehooks.io integration

export const API_BASE_URL = 'https://brave-atrium-8803.codehooks.io';
export const API_TOKEN = '03760956-bbdc-4fad-a4af-fea9c9fd4240';

export const COLLECTIONS = {
  USERS: 'users',
  TRAINING_DATA: 'training_data',
  DETECTION_RESULTS: 'detection_results',
  FEEDBACK: 'feedback',
  ANALYTICS: 'analytics',
};

export const ENDPOINTS = {
  MODEL_TRAINING: '/model_training',
  NOTIFICATIONS: '/notifications',
};

export const getHeaders = () => ({
  'x-apikey': API_TOKEN,
  'Content-Type': 'application/json',
});