import { toast } from "sonner";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (this.isConnected) {
      console.log('WebSocket is already connected');
      return;
    }

    this.socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
      this.isConnected = true;
      toast.success('Connected to WebSocket server');
    };

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      // Handle incoming messages here
    };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      this.isConnected = false;
      toast.error('Disconnected from WebSocket server');
      // Attempt to reconnect after a delay
      setTimeout(() => this.connect(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('WebSocket error occurred');
    };
  }

  send(message) {
    if (this.isConnected) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('Cannot send message, WebSocket is not connected');
      toast.error('Cannot send message, not connected to server');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService();