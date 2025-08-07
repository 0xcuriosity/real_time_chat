import { useState, useEffect } from "react";
export const useSocket = (token: string | null) => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    const ws = new WebSocket(`ws://localhost:8080?token=${token}`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
      console.log("WebSocket connected");
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  }, [token]);

  return { socket, loading };
};
