import { API_BASE_URL, getHeaders } from '../config/api';
import { queueService } from './queueService';

class DataStorageService {
  async create(collection, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  }

  async read(collection, id = null) {
    try {
      const url = id ? `${API_BASE_URL}/${collection}/${id}` : `${API_BASE_URL}/${collection}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Read error:', error);
      throw error;
    }
  }

  async update(collection, id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  async delete(collection, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  async processData(collection, action, data) {
    try {
      // Enqueue data processing task
      await queueService.enqueue('data-processing', { collection, action, data });
      return { success: true, message: 'Data processing task queued' };
    } catch (error) {
      console.error('Data processing error:', error);
      throw error;
    }
  }
}

export const dataStorageService = new DataStorageService();