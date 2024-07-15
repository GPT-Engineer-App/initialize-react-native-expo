import { API_BASE_URL, API_TOKEN, ENDPOINTS } from '../config/api';

class QueueService {
  constructor() {
    this.baseUrl = `${API_BASE_URL}${ENDPOINTS.QUEUE}`;
    this.headers = {
      'Content-Type': 'application/json',
      'x-apikey': API_TOKEN,
    };
  }

  async enqueue(queueName, payload, delay = 0) {
    try {
      const response = await fetch(`${this.baseUrl}/${queueName}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ payload, delay }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error enqueueing task:', error);
      throw error;
    }
  }

  async dequeue(queueName) {
    try {
      const response = await fetch(`${this.baseUrl}/${queueName}`, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error dequeuing task:', error);
      throw error;
    }
  }
}

export const queueService = new QueueService();