import axios from 'axios';
import { apiConfig, endpoints } from './apiConfig';

const api = axios.create(apiConfig);

export const feedbackService = {
  submitFeedback: async (userId, detectionResultId, feedback) => {
    const feedbackData = { userId, detectionResultId, feedback };
    const response = await api.post(endpoints.feedback, feedbackData);
    return response.data;
  },

  getFeedback: async (detectionResultId) => {
    const response = await api.get(`${endpoints.feedback}?detectionResultId=${detectionResultId}`);
    return response.data;
  },

  updateFeedback: async (feedbackId, updatedFeedback) => {
    const response = await api.put(`${endpoints.feedback}/${feedbackId}`, updatedFeedback);
    return response.data;
  },

  deleteFeedback: async (feedbackId) => {
    const response = await api.delete(`${endpoints.feedback}/${feedbackId}`);
    return response.data;
  },
};