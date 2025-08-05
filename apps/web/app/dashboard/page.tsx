"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HTTP_BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [createRoomName, setCreateRoomName] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  async function createRoom() {
    const response = await axios.post(
      `${HTTP_BACKEND_URL}/api/v1/room/create`,
      {
        slug: createRoomName,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    const slug = response.data.createdRoom.slug;
    router.push(`/room/${slug}`);
  }

  async function joinRoom(roomName: string) {}
  return (
    <>
      {/* Create Room */}
      <div>
        <input
          type="text"
          placeholder="room name"
          onChange={(e) => {
            setCreateRoomName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            createRoom();
          }}
        >
          Create Room
        </button>
      </div>
      {/* Join Room */}
      <div>
        <input
          type="text"
          placeholder="room name"
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            joinRoom(roomName);
          }}
        >
          Join Room
        </button>
      </div>
    </>
  );
}
