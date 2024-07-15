import axios from 'axios';

const codehooks = axios.create({
  baseURL: import.meta.env.VITE_CODEHOOKS_APP_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Codehooks-Api-Key': import.meta.env.VITE_CODEHOOKS_API_KEY,
  },
});

export default codehooks;