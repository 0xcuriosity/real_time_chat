"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { HTTP_BACKEND_URL } from "../../config";
import ChatRoomClient from "../../components/ChatRoomClient";
import { useParams } from "next/navigation";
import ChatRoom from "../../components/ChatRoom";
export default function Room() {
  const params = useParams();
  const slug = params.slug as string;
  const [roomId, setRoomId] = useState(null);
  async function getRoomId(slug: string, token: string) {
    try {
      console.log(`${HTTP_BACKEND_URL}/api/v1/room/room/${slug}`);
      const response = await axios.get(
        `${HTTP_BACKEND_URL}/api/v1/room/room/${slug}`,
        {
          headers: {
            token,
          },
        }
      );
      setRoomId(response.data.id);
      console.log(roomId);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      getRoomId(slug, storedToken);
    }
  }, [slug]);
  return <div>{roomId && <ChatRoom id={roomId} />}</div>;
}

// TODO - inside this room =>
// fetch the messages from the http backend
// connect to the websocket backend
// let the user send messages and recieve
