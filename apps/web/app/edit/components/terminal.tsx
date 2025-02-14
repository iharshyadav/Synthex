import { useState } from "react";

const Terminal = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [command, setCommand] = useState("");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() === "") return;
    
    setOutput((prev) => [...prev, `$ ${command}`, "Command executed: " + command]);
    setCommand("");
  };

  return (
    <div className="w-full h-64 bg-black text-green-400 p-4 font-mono overflow-auto rounded-md border border-gray-700 shadow-lg">
      <div className="flex flex-col space-y-1">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex items-center mt-2">
        <span className="text-green-400">$</span>
        <input
          className="bg-black border-none text-green-400 focus:ring-0 ml-2 outline-none w-full"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
