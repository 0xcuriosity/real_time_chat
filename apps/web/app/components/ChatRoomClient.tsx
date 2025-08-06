"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { NEXT_CACHE_TAG_MAX_LENGTH } from "next/dist/lib/constants";
export default function ChatRoomClient({
  messages,
  id,
  token,
}: {
  messages: { message: string }[];
  id: string;
  token: string;
}) {
  console.log(token);
  //   console.log(messages);
  const [chats, setChats] = useState(messages);
  console.log(chats);
  const [currentMsg, setCurrentMsg] = useState("");
  const { socket, loading } = useSocket(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiMTNiNmVjLWQ2NTctNGI1My1hMmI2LTgxZTdlZjg1MmM0ZSIsImlhdCI6MTc1NDQxMzk0MX0.O4E7Owx6sT_jzVz7AU0HHT9zheEG34ImaOtOsiZ1cBM"
  );

  useEffect(() => {
    if (messages && messages.length > 0) {
      setChats(messages);
    }
  }, [messages]);
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data.toString());
        if (parsedData.type === "chat") {
          setChats((c) => [...c, parsedData.message]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <>
      <div>
        {chats.map((m) => (
          <div>{m.message}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="message"
        onChange={(e) => {
          setCurrentMsg(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(socket);
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentMsg,
            })
          );
          setCurrentMsg("");
        }}
      >
        Send
      </button>
    </>
  );
}
