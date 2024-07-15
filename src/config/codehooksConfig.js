// Codehooks.io API Configuration
export const CODEHOOKS_API_URL = import.meta.env.VITE_CODEHOOKS_API_URL || 'https://your-app.codehooks.io/dev';
export const CODEHOOKS_API_KEY = import.meta.env.VITE_CODEHOOKS_API_KEY || 'your-api-key';

// Other Codehooks.io related configurations
export const CODEHOOKS_CONFIG = {
  timeout: 10000, // Request timeout in milliseconds
  retryAttempts: 3, // Number of retry attempts for failed requests
};