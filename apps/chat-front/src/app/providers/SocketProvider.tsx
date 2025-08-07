// app/providers/SocketProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "@/app/hooks/useSocket";

interface SocketContextValue {
  socket: WebSocket | null;
  loading: boolean;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  // grab token once on mount
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // our hook, now called only here
  const { socket, loading } = useSocket(token);

  return (
    <SocketContext.Provider value={{ socket, loading }}>
      {children}
    </SocketContext.Provider>
  );
};

// hook for pages/components to consume
export function useSocketContext(): SocketContextValue {
  const ctx = useContext(SocketContext);
  if (!ctx)
    throw new Error("useSocketContext must be used within a SocketProvider");
  return ctx;
}
