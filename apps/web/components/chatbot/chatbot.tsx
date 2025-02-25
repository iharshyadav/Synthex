"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, X, MessageCircle } from "lucide-react";
import { cn } from "@components/lib/utils";
import { chatBotResponse } from "./AIchatbot";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatBotResponse(input);
      console.log(response);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response || "I'm here to help!",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-[28rem] h-[600px] bg-black rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-800"
          >
            <div className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50 p-4 flex justify-between items-center border-b border-zinc-800 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-800/50 border border-zinc-700">
                  <Bot className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h2 className="text-zinc-100 font-medium">
                    Synthex AI Assistant
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-zinc-400 hover:text-zinc-200" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-black">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "flex items-start space-x-2 mb-4",
                      message.role === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.role === "user" ? "bg-zinc-700" : "bg-zinc-800"
                      )}
                    >
                      {message.role === "user" ? (
                        user?.imageUrl ? (
                          <img
                            src={user?.imageUrl}
                            alt="User"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-zinc-300" />
                        )
                      ) : (
                        <Bot className="w-4 h-4 text-zinc-300" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "px-4 py-2 rounded-xl max-w-[80%]",
                        message.role === "user"
                          ? "bg-zinc-800 text-zinc-200"
                          : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                      )}
                    >
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {message.content
                          .split("\n")
                          .map((line, index, array) => {
                            if (line.startsWith("```")) {
                              let language = line.slice(3).trim();
                              let codeContent = [];
                              let i = index + 1;

                              while (
                                i < array.length &&
                                array[i]?.startsWith("```") === false
                              ) {
                                codeContent.push(array[i]);
                                i++;
                              }

                              return (
                                <div
                                  key={index}
                                  className="my-2 p-4 bg-zinc-950 rounded-lg"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-zinc-500">
                                      {language}
                                    </span>
                                  </div>
                                  <pre className="overflow-x-auto">
                                    <code className="text-sm font-mono text-zinc-300">
                                      {codeContent.join("\n")}
                                    </code>
                                  </pre>
                                </div>
                              );
                            } else if (line.startsWith("```")) {
                              return null;
                            }

                            return (
                              line.trim() && (
                                <p
                                  key={index}
                                  className="leading-relaxed mb-2 last:mb-0"
                                >
                                  {line
                                    .split(/(\*\*.*?\*\*)/)
                                    .map((part, i) => {
                                      if (
                                        part.startsWith("**") &&
                                        part.endsWith("**")
                                      ) {
                                        return (
                                          <strong key={i}>
                                            {part.slice(2, -2)}
                                          </strong>
                                        );
                                      }
                                      return part;
                                    })}
                                </p>
                              )
                            );
                          })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl mb-4 backdrop-blur-sm "
                >
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-200" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 bg-zinc-900 border-t border-zinc-800"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-700 border border-zinc-700 placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                                    hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed 
                                    transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 
                                    transform hover:scale-105 active:scale-95 border border-indigo-400/50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 flex items-center gap-3 lg:px-6 px-3 py-3 lg:py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 border-2 border-indigo-400/50 backdrop-blur-sm group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <MessageCircle className="w-6 h-6 text-white group-hover:text-indigo-200" />
            </motion.div>
            <span className="text-white lg:block hidden font-medium text-sm">Chat with AI</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
