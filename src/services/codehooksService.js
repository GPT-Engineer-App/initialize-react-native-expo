const API_BASE_URL = 'https://wondrous-yacht-60d3.codehooks.io';
const API_TOKEN = 'da4326b6-ffa4-4a89-b188-a5f4da991c8b';

const headers = {
  'x-apikey': API_TOKEN,
  'Content-Type': 'application/json'
};

export const codehooksService = {
  // GET Request
  getData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`, { 
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

  // GET Request with Collection
  getCollectionData: async (collection) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}`, { 
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

  // PATCH Request
  patchData: async (collection, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/_byquery`, { 
        method: 'PATCH', 
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

  // PATCH Request with ID
  patchDataById: async (collection, id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/${id}`, { 
        method: 'PATCH', 
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
  deleteData: async (collection) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${collection}/_byquery`, { 
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
  },

  // DELETE Request with ID
  deleteDataById: async (collection, id) => {
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