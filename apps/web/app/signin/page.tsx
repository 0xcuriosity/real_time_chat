"use client";
import axios from "axios";
import { HTTP_BACKEND_URL } from "../config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function signIn() {
    const response = await axios.post(
      `${HTTP_BACKEND_URL}/api/v1/user/signin`,
      {
        username: username,
        password: password,
      }
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    router.push("/dashboard");
  }
  return (
    <>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    </>
  );
}
