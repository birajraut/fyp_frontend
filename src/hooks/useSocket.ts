import React, { useEffect, useState } from 'react'

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return socket;
};
