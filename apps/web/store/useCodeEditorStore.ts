import { CodeEditorState } from "./../types/index";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

const getInitialState = () => {
    // if we're on the server, return default values
    if (typeof window === "undefined") {
      return {
        language: "javascript",
        fontSize: 16,
        theme: "vs-dark",
      };
    }
  
    // if we're on the client, return values from local storage because localStorage is a browser API.
    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    const savedFontSize = localStorage.getItem("editor-font-size") || 16;
  
    return {
      language: savedLanguage,
      theme: savedTheme,
      fontSize: Number(savedFontSize),
    };
  };

  export const useEditorStore = create<CodeEditorState>((set , get) => {
    const initialState = getInitialState();

    return {
        ...initialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null as editor.IStandaloneCodeEditor | null,
        executionResult: null,
        getCode: () => get().editor?.getValue() || "",
        setEditor: (editor: editor.IStandaloneCodeEditor) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`);
            if (savedCode) editor.setValue(savedCode);
      
            set({ editor });
          },      
          setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({ theme });
          },
          setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({ fontSize });
          },  
          setLanguage: (language: string) => {
            // Saving the current language code before switching to another language in local storage
            const currentCode = get().editor?.getValue();
            if (currentCode) {
              localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }
      
            localStorage.setItem("editor-language", language);
      
            set({
              language,
              output: "",
              error: null,
            });
          },

          runCode: async () => {
            
          }
        
    }
})  