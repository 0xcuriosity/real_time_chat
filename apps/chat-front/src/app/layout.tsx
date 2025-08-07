import "./globals.css";

// app/layout.tsx
import { SocketProvider } from "./providers/SocketProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* now every page has access to one persistent socket */}
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
