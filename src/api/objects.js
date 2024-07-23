import { API_BASE_URL } from '../config/api';

export async function fetchObjectSummary(startDate, endDate) {
  const params = new URLSearchParams();
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  try {
    const response = await fetch(`${API_BASE_URL}/object-summary?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch object summary');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch object summary error:', error);
    throw error;
  }
}

export async function incrementObjectCount(objectType, count = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/increment-object`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objectType, count }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to increment object count');
    }

    return await response.json();
  } catch (error) {
    console.error('Increment object count error:', error);
    throw error;
  }
}