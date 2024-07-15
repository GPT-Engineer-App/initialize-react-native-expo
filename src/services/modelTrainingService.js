import axios from 'axios';
import { apiConfig, endpoints } from './apiConfig';

const api = axios.create(apiConfig);

export const modelTrainingService = {
  uploadTrainingData: async (trainingData) => {
    const response = await api.post(`${endpoints.trainingData}/upload`, trainingData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  startTrainingJob: async (modelConfig) => {
    const response = await api.post(`${endpoints.trainingData}/train`, modelConfig);
    return response.data;
  },

  getTrainingStatus: async (jobId) => {
    const response = await api.get(`${endpoints.trainingData}/status/${jobId}`);
    return response.data;
  },

  getTrainedModel: async (modelId) => {
    const response = await api.get(`${endpoints.trainingData}/model/${modelId}`);
    return response.data;
  },
};