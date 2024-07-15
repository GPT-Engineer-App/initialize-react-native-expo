import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

const RealTimeNotifications = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('wss://your-websocket-server-url');

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
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
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