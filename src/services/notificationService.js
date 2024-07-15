import axios from 'axios';
import { apiConfig, endpoints } from './apiConfig';

const api = axios.create(apiConfig);

export const notificationService = {
  sendNotification: async (userId, message) => {
    const notification = { userId, message };
    const response = await api.post(endpoints.notifications, notification);
    return response.data;
  },

  getNotifications: async (userId) => {
    const response = await api.get(`${endpoints.notifications}?userId=${userId}`);
    return response.data;
  },

  markNotificationAsRead: async (notificationId) => {
    const response = await api.put(`${endpoints.notifications}/${notificationId}`, { read: true });
    return response.data;
  },

  deleteNotification: async (notificationId) => {
    const response = await api.delete(`${endpoints.notifications}/${notificationId}`);
    return response.data;
  },
};