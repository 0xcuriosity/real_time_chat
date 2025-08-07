"use client";
import React, { useRef } from "react";
import axios from "axios";
import { MessageCircle, Lock, AtSign, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function SigninPage(): React.JSX.Element {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function singin() {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/signin",
      {
        username: userNameRef.current?.value,
        password: passwordRef.current?.value,
      }
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    alert("sing in successfull");
    router.push(`/dashboard/${token}`);
  }
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative flex items-center justify-center">
      {/* Static background gradient */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent" />

      {/* Back to home button */}
      <button className="absolute top-8 left-8 z-20 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group">
        <ArrowLeft
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
          onClick={() => {
            router.push("/");
          }}
        />
        <span>Back to Home</span>
      </button>

      {/* Signin Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your ChatFlow account</p>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              singin();
            }}
          >
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-all duration-300"
                ref={userNameRef}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-all duration-300"
                ref={passwordRef}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  );
}
