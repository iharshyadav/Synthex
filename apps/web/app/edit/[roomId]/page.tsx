"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { initSocket } from "../components/socket";
import { ACTIONS } from "@components/action";
import toast from "react-hot-toast";
import Client from "../components/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Command } from "lucide-react";

const Editor = dynamic(() => import("../components/editor"), {
  ssr: false,
});

interface pageProps {}

interface Client {
  socketId: string;
  username: string;
}

const page: FC<pageProps> = ({}) => {
  const socketRef = useRef<Socket>(null);
  const codeRef = useRef<string | null>(null);
  const { roomId } = useParams();
  const [clients, setClients] = useState<Client[]>([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const route = useRouter();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e: any) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username: joinedUsername, socketId }) => {
          if (joinedUsername !== username) {
            console.log("user joined the room")
            toast.success(`${joinedUsername} joined the room.`);
            console.log(`${joinedUsername} joined`);
          }
          setClients(clients);
          socketRef.current?.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
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

  return (
    <div className="flex h-screen bg-[#0F0F0F]">
      <div className="w-80 bg-[#1A1A1A] border-r border-[#2A2A2A] flex flex-col">
        <div className="p-6 border-b border-[#2A2A2A]">
          <div className="flex items-center space-x-3">
            <Link href="/" className="group relative">
              <div
                className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 
                group-hover:opacity-100 blur-xl transition-all duration-700 group-hover:duration-200"
              />

              <div className="flex items-center gap-3 sm:gap-4">
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
        </div>

        <div className="flex-1 p-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Connected Users • {clients.length}
          </h3>
          <div className="space-y-2">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="p-6 space-y-3 border-t border-[#2A2A2A]">
          <button
            onClick={copyRoomId}
            className="w-full group relative px-4 py-2.5 flex items-center justify-center rounded-lg bg-[#2A2A2A] hover:bg-[#333333] transition-all duration-200"
          >
            <span className="relative z-10 text-gray-300 font-medium">
              Copy Room ID
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={leaveRoom}
            className="w-full group relative px-4 py-2.5 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
          >
            <span className="relative z-10 text-red-500 font-medium">
              Leave Room
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#0F0F0F]">
        <div className="h-full w-full">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
