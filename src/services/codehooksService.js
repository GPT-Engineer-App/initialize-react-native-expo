import { API_BASE_URL, API_TOKEN, COLLECTIONS } from '../config/api';

const headers = {
  'x-apikey': API_TOKEN,
  'Content-Type': 'application/json'
};

export const codehooksService = {
  // GET Request
  getData: async (collection) => {
    try {
      console.log(`Fetching data from collection: ${collection}`);
      const response = await fetch(`${API_BASE_URL}/${collection}`, { 
        method: 'GET', 
        headers
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Data fetched from ${collection}:`, data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  // POST Request
  postData: async (collection, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}`, { 
        method: 'POST', 
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  // GET Request with ID
  getDataById: async (collection, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/${id}`, { 
        method: 'GET', 
        headers
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  // PUT Request
  putData: async (collection, id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/${id}`, { 
        method: 'PUT', 
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  // DELETE Request
  deleteData: async (collection, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/${id}`, { 
        method: 'DELETE', 
        headers
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};