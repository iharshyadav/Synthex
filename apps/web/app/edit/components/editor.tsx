import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ACTIONS } from "@components/action";

interface EditorProps {
  socketRef: React.RefObject<any>;
  roomId: string | undefined | string[];
  onCodeChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef<any>(null);
  const [isRemoteChange, setIsRemoteChange] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent((event: any) => {
      if (!isRemoteChange) {
        const code = editor.getValue();
        const position = editor.getPosition();
        onCodeChange(code);
        socketRef.current?.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
          position,
        });
      }
    });
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(
        ACTIONS.CODE_CHANGE,
        ({ code, position }: { code: string; position: any }) => {
          if (code !== null && editorRef.current) {
            setIsRemoteChange(true);
            editorRef.current.setValue(code);
            if (position) {
              editorRef.current.setPosition(position);
            }
            setIsRemoteChange(false);
          }
        }
      );

      socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }: { code: string }) => {
        if (code !== null && editorRef.current) {
          setIsRemoteChange(true);
          editorRef.current.setValue(code);
          setIsRemoteChange(false);
        }
      });
    }

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE);
      socketRef.current?.off(ACTIONS.SYNC_CODE);
    };
  }, [socketRef.current]);

  return (
    <div className="editor-container p-4 bg-[#1e1e1e] h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-gray-400 text-sm">JavaScript Editor</div>
      </div>
      <MonacoEditor
        height="90vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          fontSize: 16,
          minimap: { enabled: true, scale: 10 },
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
        className="rounded-lg shadow-xl border-2 border-gray-700"
      />
    </div>
  );
};

export default Editor;
