import { CODEHOOKS_API_URL, CODEHOOKS_API_KEY } from '../config/codehooksConfig';

class AnalyticsService {
  constructor() {
    this.baseUrl = CODEHOOKS_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CODEHOOKS_API_KEY}`,
    };
  }

  async trackEvent(userId, eventName, eventData) {
    const response = await fetch(`${this.baseUrl}/analytics/events`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ userId, eventName, eventData }),
    });
    return response.json();
  }

  async getUserAnalytics(userId) {
    const response = await fetch(`${this.baseUrl}/analytics/users/${userId}`, {
      headers: this.headers,
    });
    return response.json();
  }

  async getApplicationPerformance(startDate, endDate) {
    const response = await fetch(`${this.baseUrl}/analytics/performance?startDate=${startDate}&endDate=${endDate}`, {
      headers: this.headers,
    });
    return response.json();
  }
}

export const analyticsService = new AnalyticsService();