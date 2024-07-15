import { API_BASE_URL, ENDPOINTS, getHeaders } from '../config/api';

class NotificationService {
  async sendNotification(userId, message) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTIFICATIONS}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ userId, message }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Send notification error:', error);
      throw error;
    }
  }

  async getNotifications(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTIFICATIONS}?userId=${userId}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get notifications error:', error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();