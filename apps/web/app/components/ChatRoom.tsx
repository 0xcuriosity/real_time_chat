"use client";
import axios from "axios";
import { HTTP_BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import ChatRoomClient from "./ChatRoomClient";

export default function ChatRoom({ id }: { id: string }) {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");

  async function getChats(id: string, token: string) {
    const response = await axios.get(
      `${HTTP_BACKEND_URL}/api/v1/room/chats/${id}`,
      {
        headers: {
          token,
        },
      }
    );
    setMessages(response.data);
    return response.data;
  }
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      getChats(id, storedToken);
      setToken(storedToken);
      console.log(messages);
    }
  }, []);
  return <ChatRoomClient messages={messages} id={id} token={token} />;
}
