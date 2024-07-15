import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { WEBSOCKET_URL } from '../config/websocket';

const RealTimeNotifications = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      toast.info(notification.message, {
        description: notification.description,
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      toast.error('WebSocket connection error. Please try refreshing the page.');
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      toast.warning('WebSocket disconnected. Attempting to reconnect...');
      // Attempt to reconnect after a delay
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default RealTimeNotifications;