import { useRouter } from "next/navigation";
import { useState } from "react";
async function joinRoom() {}
export default function JoinChatRoom() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  return (
    <>
      <input
        type="text"
        placeholder="roomId"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          router.push(`/room/${roomId}`);
        }}
      >
        Join Room
      </button>
    </>
  );
}
