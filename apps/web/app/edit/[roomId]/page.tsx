"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ACTIONS } from "@components/action";
import toast from "react-hot-toast";
import Client from "../components/client";
import Editor from "../components/editor";
import Link from "next/link";
import { Command } from "lucide-react";
import Terminal from "../components/terminal";

interface Client {
  socketId: string;
  username: string;
}

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);

const page = ({}) => {
  const codeRef = useRef<string | null>(null);
  const { roomId } = useParams();
  const [clients, setClients] = useState<Client[]>([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const route = useRouter();

  useEffect(() => {
    const init = async () => {
      socket.on("connect_error", (err) => handleErrors(err));
      socket.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e: any) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
      }

      socket.emit(ACTIONS.JOIN, {
        roomId,
        username: username,
      });

      socket.on(
        ACTIONS.JOINED,
        ({ clients, username: joinedUsername, socketId }) => {
          if (joinedUsername !== username) {
            console.log("user joined the room");
            toast.success(`${joinedUsername} joined the room.`);
            console.log(`${joinedUsername} joined`);
          }
          setClients(clients);
        }
      );

      socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socket.off(ACTIONS.JOINED);
      socket.off(ACTIONS.DISCONNECTED);
      socket.disconnect();
    };
  }, []);

  async function copyRoomId() {
    try {
      if (!roomId) return;
      await navigator.clipboard.writeText(roomId.toString());
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
    route.push("/");
  }

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-80 h-auto md:h-full bg-zinc-950/50 backdrop-blur-xl border-b md:border-r border-zinc-800/50">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-zinc-800/50">
        <Link href="/" className="group relative inline-flex">
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 
          group-hover:opacity-100 blur-xl transition-all duration-500" />
        <div className="relative flex items-center gap-4">
          <div className="bg-gradient-to-br from-zinc-900 to-black p-3 rounded-2xl 
          ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all duration-300">
          <Command className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transform group-hover:scale-110 transition-all duration-300" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
          bg-clip-text text-transparent">
          Synthex
          </h1>
        </div>
        </Link>
      </div>

      {/* Connected Users */}
      <div className="flex-1 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-6">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <h3 className="text-sm font-medium text-zinc-400">
          Connected Users • {clients.length}
        </h3>
        </div>
        <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent blur-3xl" />
        <div className="space-y-2 relative">
          {clients.map((client) => (
          <Client key={client.socketId} username={client.username} />
          ))}
        </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 md:p-6 space-y-3 border-t border-zinc-800/50 bg-zinc-950/30">
        <button
        onClick={copyRoomId}
        className="w-full relative group px-4 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-200"
        >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <span className="relative text-zinc-300 font-medium">Copy Room ID</span>
        </button>

        <button
        onClick={leaveRoom}
        className="w-full relative group px-4 py-3 rounded-xl bg-red-950/20 hover:bg-red-950/30 transition-all duration-200"
        >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <span className="relative text-red-400 font-medium">Leave Room</span>
        </button>
      </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5" />
      <div className="h-full w-full relative">
        <Editor
        socket={socket}
        roomId={roomId}
        onCodeChange={(code) => {
          codeRef.current = code;
        }}
        />
      </div>
      {/* Terminal Section */}
      <div className="absolute bottom-0 w-full">
        <div className="relative">
          <button
        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
        className="absolute -top-8 right-4 px-3 py-1 rounded-t-lg bg-zinc-800/90 text-zinc-400 text-sm hover:bg-zinc-700/90 transition-all"
          >
        {isTerminalOpen ? 'Hide Terminal' : 'Show Terminal'}
          </button>
          {isTerminalOpen && (
        <div className="w-full h-[300px] bg-zinc-900/95 border-t border-zinc-800/50 backdrop-blur-xl">
          <Terminal
            code={codeRef.current || ''}
            socket={socket}
            roomId={roomId}
          />
        </div>
          )}
        </div>
      </div>
      </main>
    </div>
  );
};

export default page;
