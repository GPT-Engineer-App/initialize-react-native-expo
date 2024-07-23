import { API_BASE_URL } from '../config/api';

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }

    return await response.json(); // will return { accessToken }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function signupUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }

    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function logoutUser() {
  localStorage.removeItem('accessToken');
}

export function isAuthenticated() {
  return !!localStorage.getItem('accessToken');
}