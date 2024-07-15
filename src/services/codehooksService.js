import { API_BASE_URL, getHeaders } from '../config/api';

class CodehooksService {
  async improveModel(screenshot, metadata) {
    try {
      const response = await fetch(`${API_BASE_URL}/improveModel`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ screenshot, metadata }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    } catch (error) {
      console.error('Improve model error:', error);
      throw error;
    }
  }

  async getUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/userData`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get user data error:', error);
      throw error;
    }
  }

  async saveDetectionArea(userId, detectionArea) {
    try {
      const response = await fetch(`${API_BASE_URL}/saveDetectionArea`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ userId, detectionArea }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    } catch (error) {
      console.error('Save detection area error:', error);
      throw error;
    }
  }

  async getDetectionArea(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/getDetectionArea/${userId}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get detection area error:', error);
      throw error;
    }
  }

  async incrementCount(itemId, incrementBy) {
    try {
      const response = await fetch(`${API_BASE_URL}/incrementCount`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ itemId, incrementBy }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    } catch (error) {
      console.error('Increment count error:', error);
      throw error;
    }
  }
}

export const codehooksService = new CodehooksService();