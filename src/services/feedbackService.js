import { CODEHOOKS_API_URL, CODEHOOKS_API_KEY } from '../config/codehooksConfig';

class FeedbackService {
  constructor() {
    this.baseUrl = CODEHOOKS_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CODEHOOKS_API_KEY}`,
    };
  }

  async submitFeedback(detectionId, feedback) {
    const response = await fetch(`${this.baseUrl}/feedback`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ detectionId, feedback }),
    });
    return response.json();
  }

  async getFeedbackForDetection(detectionId) {
    const response = await fetch(`${this.baseUrl}/feedback?detectionId=${detectionId}`, {
      headers: this.headers,
    });
    return response.json();
  }

  async updateModelWithFeedback(modelId) {
    const response = await fetch(`${this.baseUrl}/models/${modelId}/update-with-feedback`, {
      method: 'POST',
      headers: this.headers,
    });
    return response.json();
  }
}

export const feedbackService = new FeedbackService();