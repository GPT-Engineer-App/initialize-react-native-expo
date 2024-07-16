import { API_BASE_URL, ENDPOINTS, getHeaders } from '../config/api';
import { queueService } from './queueService';

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
      // Enqueue the training job
      const job = await queueService.enqueue('model-training', { action: 'start-training' });
      return { jobId: job.id };
    } catch (error) {
      console.error('Start training job error:', error);
      throw error;
    }
  }

  async getTrainingStatus(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.MODEL_TRAINING}/status/${jobId}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get training status error:', error);
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