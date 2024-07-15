import codehooks from './codehooks';

export const sendNotification = async (userId, message) => {
  try {
    const response = await codehooks.post('/notifications', { userId, message });
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export const subscribeToNotifications = (userId, callback) => {
  const eventSource = new EventSource(`${import.meta.env.VITE_CODEHOOKS_APP_URL}/notifications/subscribe/${userId}`);
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  };

  return () => {
    eventSource.close();
  };
};