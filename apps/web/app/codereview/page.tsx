"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { generateReview } from "../../lib/action";
import NavigationHeader from "@components/NavigationHeader";
import { useEditorStore } from "store/useCodeEditorStore";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "app/editor/_constants";
import ThemeSelector from "app/editor/_components/ThemeSelector";
import Link from "next/link";
import LanguageSelector from "app/editor/_components/LanguageSelector";
import { Sparkles } from "lucide-react";

export default function CodeReview() {
  const [code, setCode] = useState(`function sum() {
    return 1 + 1
}`);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useEditorStore();
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    setLoading(true);
    const response = await generateReview(code);
    setReview(response);
    setLoading(false);
  }

  return (
    <>
      <NavigationHeader />
      <main className="min-h-screen bg-[#0F0F0F] text-white p-4 overflow-x- mt-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6 h-screen max-h-[90vh]">
          <div className="flex-1 flex flex-col">
            <div className="bg-[#1A1A1A] rounded-xl border border-[#2D2D2D] flex flex-col flex-grow overflow-hidden">
              <div className="bg-[#2D2D2D] p-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <span className="text-sm text-gray-400">code.js</span>

                <div className="flex justify-center items-center h-full">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <ThemeSelector />
                      <LanguageSelector hasAccess={Boolean(true)} />
                    </div>

                    <button
                      onClick={reviewCode}
                      className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 
        font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 
        hover:scale-[1.02] active:scale-[0.98]"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full border-t-4 border-white w-5 h-5"></div>
                          <span className="ml-2 text-sm">Reviewing...</span>
                        </>
                      ) : (
                        <span className="tracking-wide text-sm">
                          Review Code
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-grow">
                <Editor
                  height="100%"
                  language={LANGUAGE_CONFIG[language]?.monacoLanguage}
                  value={code}
                  beforeMount={defineMonacoThemes}
                  onChange={(value) => setCode(value || "")}
                  theme={theme}
                  options={{
                    minimap: { enabled: false },
                    fontSize,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    renderWhitespace: "selection",
                    fontFamily:
                      '"Fira Code", "Cascadia Code", Consolas, monospace',
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    contextmenu: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    roundedSelection: true,
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 max-h-[calc(100vh-4rem)]">
            <div className="h-full w-[48vw] rounded-xl border border-[#2D2D2D] p-4 md:p-6 overflow-y-auto scrollbar-hide">
              {loading ? (
                <div className="flex flex-col justify-center items-center h-full space-y-4">
                  <div className="animate-spin rounded-full border-t-4 border-blue-500 w-20 h-20"></div>

                  <div className="text-center">
                    <p className="text-lg text-white font-semibold animate-fadeIn">
                      Generating review...
                    </p>
                    <p className="text-sm text-gray-400 animate-fadeIn delay-200">
                      This might take a few seconds
                    </p>
                  </div>
                </div>
              ) : (
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
