import axios from 'axios';
import { apiConfig, endpoints } from './apiConfig';

const api = axios.create(apiConfig);

export const dataStorageService = {
  // User CRUD operations
  createUser: async (userData) => {
    const response = await api.post(endpoints.users, userData);
    return response.data;
  },

  getUser: async (userId) => {
    const response = await api.get(`${endpoints.users}/${userId}`);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.put(`${endpoints.users}/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`${endpoints.users}/${userId}`);
    return response.data;
  },

  // Training data CRUD operations
  saveTrainingData: async (trainingData) => {
    const response = await api.post(endpoints.trainingData, trainingData);
    return response.data;
  },

  getTrainingData: async (dataId) => {
    const response = await api.get(`${endpoints.trainingData}/${dataId}`);
    return response.data;
  },

  // Detection results CRUD operations
  saveDetectionResult: async (detectionResult) => {
    const response = await api.post(endpoints.detectionResults, detectionResult);
    return response.data;
  },

  getDetectionResults: async (userId) => {
    const response = await api.get(`${endpoints.detectionResults}?userId=${userId}`);
    return response.data;
  },
};