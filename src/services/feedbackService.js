import { API_BASE_URL, COLLECTIONS, getHeaders } from '../config/api';
import { queueService } from './queueService';

class FeedbackService {
  async submitFeedback(feedback) {
    try {
      // Enqueue feedback processing
      await queueService.enqueue('feedback-processing', feedback);
      return { success: true, message: 'Feedback queued for processing' };
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