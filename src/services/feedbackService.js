import { API_BASE_URL, COLLECTIONS, getHeaders } from '../config/api';

class FeedbackService {
  async submitFeedback(feedback) {
    try {
      const response = await fetch(`${API_BASE_URL}/${COLLECTIONS.FEEDBACK}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(feedback),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Submit feedback error:', error);
      throw error;
    }
  }

  async getFeedback() {
    try {
      const response = await fetch(`${API_BASE_URL}/${COLLECTIONS.FEEDBACK}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get feedback error:', error);
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();