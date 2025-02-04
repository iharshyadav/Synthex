import { CodeEditorState } from "./../types/index";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import axios from "axios";
import { LANGUAGE_CONFIG } from "app/editor/_constants";

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
            const {language , getCode} = get();
            const code = getCode();
            if (!code) {
              set({ error: "Please enter some code" });
              return;
            }
      
            set({ isRunning: true, error: null, output: "" });
      
            try {
              const languageConfig = LANGUAGE_CONFIG[language];
              if (!languageConfig) {
                set({ error: "Unsupported language" });
                return;
              }
              const runtime = languageConfig.pistonRuntime;
              const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  language: runtime.language,
                  version: runtime.version,
                  files: [{ content: code }],
                }),
              });
      
              const data = await response.json();
      
              if (data.message) {
                set({ error: data.message, executionResult: { code, output: "", error: data.message } });
                return;
              }
      
              if (data.compile && data.compile.code !== 0) {
                const error = data.compile.stderr || data.compile.output;
                set({
                  error,
                  executionResult: {
                    code,
                    output: "",
                    error,
                  },
                });
                return;
              }
      
              if (data.run && data.run.code !== 0) {
                const error = data.run.stderr || data.run.output;
                const filteredError = error.split("\n").map((line: string, index: number) => {
                  if (line.includes("/piston/jobs/")) {
                    return `Line ${index + 1}: ${line.split("/piston/jobs/")[1]}`;
                  }
                  return line;
                }).join("\n");
                // console.log(filteredError);
                // console.log(error)
                set({
                  error:filteredError,
                  executionResult: {
                    code,
                    output: "",
                    error,
                  },
                });
                return;
              }
      
              const output = data.run.output;
      
              set({
                output: output.trim(),
                error: null,
                executionResult: {
                  code,
                  output: output.trim(),
                  error: null,
                },
              });
            } catch (error) {
              console.log("Error running code:", error);
              set({
                error: "Error running code",
                executionResult: { code, output: "", error: "Error running code" },
              });
            } finally {
              set({ isRunning: false });
            }
          },
          // runCode : async () => {
          //   const {language , getCode} = get();
          //   const code = getCode();
          //   console.log(code)
          //   if (!code) {
          //   set({ error: "Please enter some code" });
          //   return;
          //   }
          //   const base64 = btoa(code);
          //   const options = {
          //     method: 'POST',
          //     url: 'https://judge0-ce.p.rapidapi.com/submissions',
          //     params: {
          //       base64_encoded: 'true',
          //       wait: 'false',
          //       fields: '*'
          //     },
          //     headers: {
          //       'x-rapidapi-key': '05422b61e2mshcb8adacf40faf91p12d1bejsnc4bb0a756a58',
          //       'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          //       'Content-Type': 'application/json'
          //     },
          //     data: {
          //       language_id: 102,
          //       source_code: base64,
          //       stdin: 'SnVkZ2Uw'
          //     }
          //   };
            
          //   try {
          //       const response = await axios.request(options);
          //       console.log(response.data.token);
          //       // set({
          //       //         output: response.trim(),
          //       //         error: null,
          //       //         executionResult: {
          //       //           code,
          //       //           output: output.trim(),
          //       //           error: null,
          //       //         },
          //       //       });
          //     //   return response.data;
          //   } catch (error) {
          //       console.error(error);
          //   }
          // }
    }
})  

export const getExecutionResult = () => useEditorStore.getState().executionResult;