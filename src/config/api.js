// API Configuration for Codehooks.io integration

export const API_BASE_URL = 'https://brave-atrium-8803.codehooks.io/api';
export const API_TOKEN = '03760956-bbdc-4fad-a4af-fea9c9fd4240';

export const COLLECTIONS = {
  EVENTS: 'events',
  USERS: 'users',
  DETECTION_AREAS: 'detection_areas',
  ITEMS: 'items',
};

export const ENDPOINTS = {
  MODEL_TRAINING: '/model-training',
  QUEUE: '/queue',
};

export const getHeaders = () => ({
  'x-apikey': API_TOKEN,
  'Content-Type': 'application/json',
});