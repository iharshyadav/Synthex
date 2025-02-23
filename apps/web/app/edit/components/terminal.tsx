import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Socket } from "socket.io-client";

interface TerminalCommand {
  id: string;
  command: string;
  output: string[];
  timestamp: string;
  status: 'success' | 'error' | 'pending';
}

interface TerminalProps {
  code: string;
  socket:any;
  roomId: string | string[] | undefined;
}

const Terminal = ({ code, socket, roomId }: TerminalProps) => {
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [command, setCommand] = useState("");
  const [theme, setTheme] = useState<'matrix' | 'cyber' | 'retro'>('matrix');
  const terminalRef = useRef<HTMLDivElement>(null);

  const themes = {
    matrix: "bg-black text-green-400",
    cyber: "bg-gray-900 text-cyan-400",
    retro: "bg-gray-800 text-amber-400"
  };

  const mockCommands = {
    help: ["Available commands:", "- clear: Clear terminal", "- theme: Switch theme", "- echo: Echo text"],
    clear: [],
    theme: ["Theme changed successfully"],
    echo: (args: string[]) => [args.join(" ")],
  };

  const generateTimestamp = () => {
    return new Date().toLocaleTimeString();
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() === "") return;

    const commandParts = command.trim().split(" ");
    const mainCommand = commandParts[0]?.toLowerCase();
    const args = commandParts.slice(1);

    const newCommand: TerminalCommand = {
      id: Date.now().toString(),
      command: command,
      output: [],
      timestamp: generateTimestamp(),
      status: 'pending'
    };

    setHistory(prev => [...prev, newCommand]);
    setCommand("");

    await new Promise(resolve => setTimeout(resolve, 500));

    setHistory(prev => prev.map(cmd => {
      if (cmd.id === newCommand.id) {
        switch (mainCommand) {
          case 'clear':
            return { ...cmd, status: 'success', output: [] };
          case 'theme':
            setTheme(prev => prev === 'matrix' ? 'cyber' : prev === 'cyber' ? 'retro' : 'matrix');
            return { ...cmd, status: 'success', output: mockCommands.theme };
          case 'help':
            return { ...cmd, status: 'success', output: mockCommands.help };
          case 'echo':
            return { ...cmd, status: 'success', output: mockCommands.echo(args) };
          default:
            return { 
              ...cmd, 
              status: 'error', 
              output: [`Command not found: ${mainCommand}`] 
            };
        }
      }
      return cmd;
    }));

    if (mainCommand === 'clear') {
      setTimeout(() => setHistory([]), 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full h-80 ${themes[theme]} p-4 font-mono overflow-auto rounded-lg border border-gray-700 shadow-2xl`}
      ref={terminalRef}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm opacity-50">Terminal v2.0</div>
      </div>

      <AnimatePresence>
        {history.map((cmd) => (
          <motion.div
            key={cmd.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2"
          >
            <div className="flex items-center space-x-2">
              <span className="opacity-50 text-sm">{cmd.timestamp}</span>
              <span className="text-purple-400">$</span>
              <span>{cmd.command}</span>
            </div>
            {cmd.output.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`ml-6 ${cmd.status === 'error' ? 'text-red-400' : ''}`}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      <form onSubmit={handleCommand} className="flex items-center mt-2">
        <span className="text-purple-400">$</span>
        <input
          className={`${themes[theme]} border-none focus:ring-0 ml-2 outline-none w-full`}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          autoFocus
          placeholder="Type 'help' for available commands..."
        />
      </form>
    </motion.div>
  );
};

export default Terminal;
