import { CODEHOOKS_API_URL, CODEHOOKS_API_KEY } from '../config/codehooksConfig';

class DataStorageService {
  constructor() {
    this.baseUrl = CODEHOOKS_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CODEHOOKS_API_KEY}`,
    };
  }

  async createItem(collection, data) {
    const response = await fetch(`${this.baseUrl}/${collection}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async getItem(collection, id) {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      headers: this.headers,
    });
    return response.json();
  }

  async updateItem(collection, id, data) {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async deleteItem(collection, id) {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    return response.json();
  }

  async queryItems(collection, query) {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`${this.baseUrl}/${collection}?${queryString}`, {
      headers: this.headers,
    });
    return response.json();
  }
}

export const dataStorageService = new DataStorageService();