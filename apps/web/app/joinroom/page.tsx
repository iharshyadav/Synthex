"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import Link from "next/link";
import { Command } from "lucide-react";

const Home = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e: any) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }
    window.location.href = `/edit/${roomId}?username=${encodeURIComponent(username)}`;
  };
  

  const handleInputEnter = (e: any) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="group relative">
              <div
                className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 
                group-hover:opacity-100 blur-xl transition-all duration-700 group-hover:duration-200"
              />

              <div className="flex items-center gap-3 sm:gap-4">
                {/* Option 3: Command icon */}
                <div
                  className="relative bg-gradient-to-br from-gray-900 to-black p-2 sm:p-2.5 rounded-xl sm:rounded-2xl 
                  ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  <Command className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>

                <div className="relative hidden sm:block">
                  <h1
                    className="text-lg sm:text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                    bg-clip-text text-transparent filter drop-shadow-lg"
                  >
                    Synthex
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          {/* Title */}
          <h4 className="text-xl text-center font-medium text-gray-200 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
            Enter Room Details
          </h4>

          {/* Input Group */}
          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />

            <button
              onClick={joinRoom}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300"
            >
              Join Room
            </button>

            <div className="text-center text-gray-400">
              <span>No invite? </span>
              <a
                onClick={createNewRoom}
                href="#"
                className="text-purple-500 hover:text-purple-400 transition-colors duration-300"
              >
                Create new room
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 text-gray-400 text-sm">
        Built with
        <span className="mx-1 animate-pulse">💜</span>
        by
        <a
          href="https://github.com/codersgyan"
          className="ml-1 text-purple-500 hover:text-purple-400 transition-colors duration-300"
        >
          Harsh
        </a>
      </footer>
    </div>
  );
};

export default Home;
