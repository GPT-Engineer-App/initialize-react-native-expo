import { API_BASE_URL, ENDPOINTS, getHeaders } from '../config/api';

class ModelTrainingService {
  async uploadTrainingData(data) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.MODEL_TRAINING}/upload`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Upload training data error:', error);
      throw error;
    }
  }

  async startTrainingJob() {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.MODEL_TRAINING}/start`, {
        method: 'POST',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Start training job error:', error);
      throw error;
    }
  }

  async getTrainedModel() {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.MODEL_TRAINING}/model`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get trained model error:', error);
      throw error;
    }
  }
}

export const modelTrainingService = new ModelTrainingService();