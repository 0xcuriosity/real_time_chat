import { useState, useEffect } from "react";
import { WS_BACKEND_URL } from "../config";

export function useSocket(token: string | null) {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // ✅ Ensure this runs only in the browser
    if (typeof window === "undefined") return;

    const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
      console.log("open ws");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);

  return { socket, loading };
}
