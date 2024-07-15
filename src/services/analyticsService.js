import { API_BASE_URL, COLLECTIONS, getHeaders } from '../config/api';

class AnalyticsService {
  async trackEvent(event) {
    try {
      const response = await fetch(`${API_BASE_URL}/${COLLECTIONS.ANALYTICS}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Track event error:', error);
      throw error;
    }
  }

  async getAnalytics(startDate, endDate) {
    try {
      const response = await fetch(`${API_BASE_URL}/${COLLECTIONS.ANALYTICS}?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();