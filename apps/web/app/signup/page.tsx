"use client";
import axios from "axios";
import { HTTP_BACKEND_URL } from "../config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  async function signUp() {
    const response = await axios.post(
      `${HTTP_BACKEND_URL}/api/v1/user/signup`,
      {
        username: username,
        password: password,
        name: name,
      }
    );
    alert("singup successfull, redireciting to singin page");
    router.push("/signin");
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
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          signUp();
        }}
      >
        Sign Up
      </button>
    </>
  );
}
