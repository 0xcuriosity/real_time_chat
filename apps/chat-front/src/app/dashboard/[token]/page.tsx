"use client";
import React, { useRef, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MessageCircle,
  Plus,
  LogIn,
  Users,
  Settings,
  Bell,
  Search,
  Hash,
  Lock,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { useSocketContext } from "@/app/providers/SocketProvider";
interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  avatarUrl?: string;
  rooms: any;
  chats: any;
}
// TODO - get the user and display his name
export default function DashboardPage(): React.JSX.Element {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const createRoomNameRef = useRef<HTMLInputElement>(null);
  const createRoomPasswordRef = useRef<HTMLInputElement>(null);
  const joinRoomNameRef = useRef<HTMLInputElement>(null);
  const joinRoomPasswordRef = useRef<HTMLInputElement>(null);
  const { socket } = useSocketContext();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<any>();
  async function createRoom() {
    const response = await axios.post(
      "http://localhost:3001/api/v1/room/create",
      {
        slug: createRoomNameRef.current?.value,
        password: createRoomPasswordRef.current?.value,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const slug = response.data.createdRoom.slug;
    alert(
      `Room created.\nRoom Name : ${slug}.\n Join Room to chat seamlessly `
    );
  }

  async function fetchRoom() {
    console.log("inside the fetch Room function");
    const response = await axios.get(
      `http://localhost:3001/api/v1/room/room/${joinRoomNameRef.current?.value}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("room fetched");
    setRoom(response.data);
    return response.data;
  }
  async function joinRoom() {
    console.log("joining room");
    const roomData = await fetchRoom();
    if (!socket) return;
    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId: roomData.id,
      })
    );
    alert("joined room ,redirecting to room");
    router.push(`/room/${roomData.slug}/${user?.id}`);
  }
  async function fetchUser() {
    console.log(localStorage.getItem("token"));
    const response = await axios.get("http://localhost:3001/api/v1/user/get", {
      headers: {
        token: String(localStorage.getItem("token")),
      },
    });
    setUser(response.data);
  }
  async function everythingDone() {
    await fetchUser();
    setLoading(false);
  }
  useEffect(() => {
    everythingDone();
  }, []);
  return (
    <>
      {!loading && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
          {/* Static background gradient */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent" />

          {/* Header */}
          <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">ChatFlow</h1>
                    <p className="text-sm text-gray-400">Dashboard</p>
                  </div>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-800/50 rounded-full px-4 py-2 hover:bg-gray-800/70 transition-colors duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Welcome to Your Dashboard
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Create new chat rooms or join existing ones to start connecting
                with your team
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Create Room Section */}
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 animate-fade-in-up">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Create New Room
                  </h3>
                  <p className="text-gray-400">
                    Start a new chat room and invite your team
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter room name"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-gray-700/70 transition-all duration-300"
                      ref={createRoomNameRef}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
                  </div>

                  <button
                    type="button"
                    className="group w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center space-x-2"
                    onClick={createRoom}
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Room</span>
                  </button>
                </form>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>Your Rooms: 5</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>Active: 3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Join Room Section */}
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 animate-fade-in-up animation-delay-200">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Join Existing Room
                  </h3>
                  <p className="text-gray-400">
                    Enter room details to join the conversation
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Room name"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-all duration-300"
                    ref={joinRoomNameRef}
                  />
                </div>

                <button
                  type="button"
                  className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2 mt-4"
                  onClick={joinRoom}
                >
                  <span>Join Room</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Browse Public Rooms */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <button className="w-full text-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 flex items-center justify-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Browse Public Rooms</span>
                  </button>
                </div>
              </div>
            </div>
          </main>

          <style jsx>{`
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }

            .animation-delay-200 {
              animation-delay: 0.2s;
              opacity: 0;
            }

            .animation-delay-400 {
              animation-delay: 0.4s;
              opacity: 0;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
