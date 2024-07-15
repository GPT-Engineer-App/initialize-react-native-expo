import axios from 'axios';
import { apiConfig, endpoints } from './apiConfig';

const api = axios.create(apiConfig);

export const analyticsService = {
  trackEvent: async (userId, eventName, eventData) => {
    const analyticsData = { userId, eventName, eventData, timestamp: new Date().toISOString() };
    const response = await api.post(endpoints.analytics, analyticsData);
    return response.data;
  },

  getAnalytics: async (userId, startDate, endDate) => {
    const response = await api.get(`${endpoints.analytics}?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },

  getAggregatedAnalytics: async (metric, startDate, endDate) => {
    const response = await api.get(`${endpoints.analytics}/aggregate?metric=${metric}&startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },
};