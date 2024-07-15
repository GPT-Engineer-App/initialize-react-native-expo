// API Configuration for Codehooks.io Integration

const API_BASE_URL = 'https://your-codehooks-app.codehooks.io/dev';
const API_KEY = 'your-api-key';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
};

export const endpoints = {
  users: '/users',
  trainingData: '/training-data',
  detectionResults: '/detection-results',
  notifications: '/notifications',
  feedback: '/feedback',
  analytics: '/analytics',
};