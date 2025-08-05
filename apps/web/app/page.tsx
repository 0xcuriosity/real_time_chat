"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          router.push("/signin");
        }}
      >
        Sign In
      </button>
    </>
  );
}
