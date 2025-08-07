"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  Users,
  Settings,
  Bell,
  ArrowLeft,
  MoreVertical,
  Smile,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useSocket } from "@/app/hooks/useSocket";
import { useSocketContext } from "@/app/providers/SocketProvider";
// Chat Component
const Chat = ({
  message,
  ifSentByUser,
  timestamp,
  username,
}: {
  message: string;
  ifSentByUser: boolean;
  timestamp: string;
  username: string;
}) => {
  return (
    <div
      className={`flex mb-6 ${ifSentByUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-xs md:max-w-md lg:max-w-lg ${ifSentByUser ? "flex-row-reverse" : "flex-row"} items-end space-x-3`}
      >
        {/* Message Container */}
        <div
          className={`flex flex-col ${ifSentByUser ? "items-end" : "items-start"}`}
        >
          {!ifSentByUser && (
            <span className="text-xs text-gray-400 mb-1 px-1">{username}</span>
          )}
          <div
            className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] ${
              ifSentByUser
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500/30 rounded-br-md"
                : "bg-gray-800/70 text-white border-gray-700/50 rounded-bl-md"
            }`}
          >
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 px-1">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default function ChatRoomPage() {
  const params = useParams();
  const slug = params.slug as string;
  const userId = params.userId as string;
  console.log(slug);
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // State for token
  const [token, setToken] = useState<string | null>(null);

  // Custom hook (called at top level — valid!)
  const { socket } = useSocketContext();

  const [chats, setChats] = useState<any>([]);
  const [room, setRoom] = useState<any>();
  const [loading, setLoading] = useState(true);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to add a new message to chats
  const addNewMessage = (newMessage: any) => {
    const formattedMessage = {
      id: Date.now(), // temporary ID
      message: newMessage.message,
      ifSentByUser: newMessage.senderId === userId,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      username: newMessage.sender?.username ?? "Unknown",
    };

    setChats((prevChats: any) => [...prevChats, formattedMessage]);
  };

  async function fetchChats(roomId: string) {
    const response = await axios.get(
      `http://localhost:3001/api/v1/room/chats/${roomId}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    const rawChats = response.data;
    const chats = rawChats
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) // sort oldest to newest
      .map((chat: any) => ({
        id: chat.id,
        message: chat.message,
        ifSentByUser: chat.senderId === userId,
        timestamp: new Date(chat.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        username: chat.sender?.username ?? "Unknown",
      }));
    setChats(chats);
  }

  async function fetchRoom() {
    console.log("inside the fetch Room function");
    const response = await axios.get(
      `http://localhost:3001/api/v1/room/room/${slug}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setRoom(response.data);
    console.log("room fetched");
    return response.data;
  }

  async function fetchData() {
    const roomData = await fetchRoom();
    await fetchChats(roomData.id);
    setLoading(false);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchData();
  }, [userId]); // Add userId as dependency

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      console.log("Receiving message:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
          addNewMessage(data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = (event) => {
      console.log("WebSocket disconnected:", event.code, event.reason);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (
      messageRef.current?.value.trim() &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      const message = messageRef.current.value.trim();
      console.log("Sending message:", message);

      socket.send(
        JSON.stringify({
          type: "chat",
          roomId: room.id,
          message: message,
        })
      );

      messageRef.current.value = "";
    } else {
      console.log("Cannot send message:", {
        hasMessage: !!messageRef.current?.value.trim(),
        hasSocket: !!socket,
        socketState: socket?.readyState,
        isOpen: socket?.readyState === WebSocket.OPEN,
      });
    }
  };

  const handleJoinRoom = () => {
    socket?.send(
      JSON.stringify({
        type: "join_room",
        roomId: room.id,
        password: "",
      })
    );
  };

  console.log(messageRef.current?.value);

  return (
    <>
      {!loading && (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col overflow-hidden">
          {/* Static background gradient */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent" />

          {/* Header - Fixed */}
          <header className="relative z-20 border-b border-gray-800/50 backdrop-blur-sm flex-shrink-0">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Room Info */}
                <div className="flex items-center space-x-4">
                  <button
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-300 hover:bg-gray-800/50 rounded-lg"
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">
                        # {room?.slug || "Project Alpha"}
                      </h1>
                      <p className="text-sm text-gray-400 flex items-center space-x-2"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Chat Messages Area - Flexible height */}
          <div className="relative z-10 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-6 py-6">
              <div className="max-w-4xl mx-auto">
                {/* Welcome Message */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">
                      Room created today
                    </span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-1">
                  {chats.map((chat: any) => (
                    <Chat
                      key={chat.id}
                      message={chat.message}
                      ifSentByUser={chat.ifSentByUser}
                      timestamp={chat.timestamp}
                      username={chat.username}
                    />
                  ))}
                  {/* Invisible div to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>

          {/* Message Input - Fixed at bottom */}
          <div className="relative z-20 border-t border-gray-800/50 backdrop-blur-sm px-6 py-4 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    ref={messageRef}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-300 pr-16"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-up {
              animation: fade-in-up 0.6s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
