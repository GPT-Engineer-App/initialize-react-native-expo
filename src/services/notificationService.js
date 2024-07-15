import { CODEHOOKS_API_URL, CODEHOOKS_API_KEY } from '../config/codehooksConfig';

class NotificationService {
  constructor() {
    this.baseUrl = CODEHOOKS_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CODEHOOKS_API_KEY}`,
    };
  }

  async sendNotification(userId, message, type = 'info') {
    const response = await fetch(`${this.baseUrl}/notifications`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ userId, message, type }),
    });
    return response.json();
  }

  async getNotifications(userId) {
    const response = await fetch(`${this.baseUrl}/notifications?userId=${userId}`, {
      headers: this.headers,
    });
    return response.json();
  }

  async markNotificationAsRead(notificationId) {
    const response = await fetch(`${this.baseUrl}/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ read: true }),
    });
    return response.json();
  }
}

export const notificationService = new NotificationService();