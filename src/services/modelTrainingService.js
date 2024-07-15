import { CODEHOOKS_API_URL, CODEHOOKS_API_KEY } from '../config/codehooksConfig';

class ModelTrainingService {
  constructor() {
    this.baseUrl = CODEHOOKS_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CODEHOOKS_API_KEY}`,
    };
  }

  async uploadTrainingData(data) {
    const response = await fetch(`${this.baseUrl}/training-data`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async startTrainingJob(modelId) {
    const response = await fetch(`${this.baseUrl}/training-jobs`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ modelId }),
    });
    return response.json();
  }

  async getTrainingJobStatus(jobId) {
    const response = await fetch(`${this.baseUrl}/training-jobs/${jobId}`, {
      headers: this.headers,
    });
    return response.json();
  }

  async getTrainedModel(modelId) {
    const response = await fetch(`${this.baseUrl}/models/${modelId}`, {
      headers: this.headers,
    });
    return response.json();
  }
}

export const modelTrainingService = new ModelTrainingService();