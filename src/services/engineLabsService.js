import { ENGINELABS_BASE_URL, COLLECTIONS, ENDPOINTS, getHeaders } from '../config/enginelabs';

class EnginelabsService {
  async request(endpoint, method = 'GET', data = null) {
    const url = `${ENGINELABS_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: getHeaders(),
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // CRUD operations
  async create(collection, data) {
    return this.request(`/${collection}`, 'POST', data);
  }

  async read(collection, id = null) {
    const endpoint = id ? `/${collection}/${id}` : `/${collection}`;
    return this.request(endpoint);
  }

  async update(collection, id, data) {
    return this.request(`/${collection}/${id}`, 'PUT', data);
  }

  async delete(collection, id) {
    return this.request(`/${collection}/${id}`, 'DELETE');
  }

  // Model Training
  async uploadTrainingData(data) {
    return this.request(`${ENDPOINTS.MODEL_TRAINING}/upload`, 'POST', data);
  }

  async startTrainingJob() {
    return this.request(`${ENDPOINTS.MODEL_TRAINING}/start`, 'POST');
  }

  async getTrainingStatus(jobId) {
    return this.request(`${ENDPOINTS.MODEL_TRAINING}/status/${jobId}`);
  }

  async getTrainedModel() {
    return this.request(`${ENDPOINTS.MODEL_TRAINING}/model`);
  }

  // Notifications
  async sendNotification(userId, message) {
    return this.request(ENDPOINTS.NOTIFICATIONS, 'POST', { userId, message });
  }

  async getNotifications(userId) {
    return this.request(`${ENDPOINTS.NOTIFICATIONS}?userId=${userId}`);
  }

  // Analytics
  async trackEvent(event) {
    return this.request(`/${COLLECTIONS.ANALYTICS}`, 'POST', event);
  }

  async getAnalytics(startDate, endDate) {
    return this.request(`/${COLLECTIONS.ANALYTICS}?startDate=${startDate}&endDate=${endDate}`);
  }

  // Feedback
  async submitFeedback(feedback) {
    return this.request(`/${COLLECTIONS.FEEDBACK}`, 'POST', feedback);
  }

  async getFeedback() {
    return this.request(`/${COLLECTIONS.FEEDBACK}`);
  }

  // Logs
  async getLogs() {
    return this.request(`/${COLLECTIONS.LOGS}`);
  }

  // Custom Endpoints
  async createCustomEndpoint(endpointData) {
    return this.request(ENDPOINTS.CUSTOM_ENDPOINTS, 'POST', endpointData);
  }

  async getCustomEndpoints() {
    return this.request(ENDPOINTS.CUSTOM_ENDPOINTS);
  }

  async executeCustomEndpoint(endpointId, data) {
    return this.request(`${ENDPOINTS.CUSTOM_ENDPOINTS}/${endpointId}/execute`, 'POST', data);
  }

  // Data Import/Export
  async importData(collection, data) {
    return this.request(`/${collection}/import`, 'POST', data);
  }

  async exportData(collection) {
    return this.request(`/${collection}/export`);
  }
}

export const engineLabsService = new EnginelabsService();