"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPassword }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchMessage();
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const fetchMessage = async () => {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-800">
      <div className="text-white text-2xl">
        {isAuthenticated ? (
          error ? (
            `Error: ${error}`
          ) : (
            message
          )
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="mb-4">Enter Password</h1>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="mb-2 p-2 text-black"
              placeholder="Password"
            />
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
