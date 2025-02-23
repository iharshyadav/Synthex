import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ACTIONS } from "@components/action";
import { Socket } from "socket.io-client";
import { runLiveCode } from "lib/action";

interface EditorProps {
  socket: Socket;
  roomId: string | string[] | undefined;
  onCodeChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ socket, roomId, onCodeChange }) => {
  const defaultValue = "// Start typing...";
  const [code, setCode] = useState(defaultValue);

  useEffect(() => {
    // Ensure the default value is always present at the start
    if (code === defaultValue || !code.includes(defaultValue)) {
      setCode(defaultValue);
    }
  }, [code]);
  const editorRef = useRef<any>(null);
  const isUpdatingRef = useRef(false); 

  useEffect(() => {
    socket.on("updateCode", (newCode: string) => {
        console.log(newCode)
      if (editorRef.current && newCode !== editorRef.current.getValue()) {
        const editor = editorRef.current;
        const position = editor.getPosition();

        isUpdatingRef.current = true;
        editor.setValue(newCode);
        editor.setPosition(position);

        setTimeout(() => (isUpdatingRef.current = false), 100);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (isUpdatingRef.current) return;

    const newValue = value || "";
    setCode(newValue);
    socket.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: newValue
    });
  };

  return (
    <div className="editor-container p-4 bg-[#1e1e1e] h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <button onClick={() => runLiveCode("javascript",code)} className="text-gray-400 text-sm">Run</button>
      </div>
      <MonacoEditor
        height="90vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        defaultValue={code}
        options={{
          fontSize: 16,
          minimap: { enabled: true, scale: 1 },
          automaticLayout: true,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          cursorStyle: "line",
          padding: { top: 10, bottom: 10 },
          folding: true,
          foldingStrategy: "indentation",
          renderLineHighlight: "all",
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: true,
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
          },
          fontFamily: "JetBrains Mono, Consolas, monospace",
          formatOnPaste: true,
          formatOnType: true,
          smoothScrolling: true,
          mouseWheelZoom: true,
          wordWrap: "on",
          bracketPairColorization: {
            enabled: true,
          },
        }}
        className="rounded-lg shadow-xl border-0 border-gray-700"
      />
    </div>
  );
};

export default Editor;
