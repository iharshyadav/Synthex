"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import NavigationHeader from "@components/NavigationHeader";
import SnippetCard from "./_components/SnippetCard";

function SnippetsPage() {
  const snippets = useQuery(api.codeSnippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#13131f]">
      <NavigationHeader />

      <div className="relative mt-10 max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r
         from-blue-600/20 to-purple-600/20 text-sm text-gray-300 mb-8 border border-blue-500/10 backdrop-blur-sm"
        >
        <BookOpen className="w-4 h-4" />
        Community Code Library
        </motion.div>
        <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-8"
        >
        Discover & Share Code Snippets
        </motion.h1>
        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-400 mb-8 leading-relaxed"
        >
        Explore a curated collection of code snippets from the community
        </motion.p>
      </div>

      <div className="relative max-w-5xl mx-auto mb-16 space-y-8">
        <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-5 h-5 text-gray-400" />
          <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search snippets by title, language, or author..."
          className="w-full pl-14 pr-6 py-5 bg-[#1e1e2e]/90 hover:bg-[#1e1e2e] text-white
            rounded-2xl border border-[#313244] hover:border-[#414155] transition-all duration-300
            placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg"
          />
        </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#1e1e2e]/80 rounded-xl ring-1 ring-gray-800 backdrop-blur-sm">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Languages:</span>
        </div>

        {popularLanguages.map((lang) => (
          <button
          key={lang}
          onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
          className={`
            group relative px-4 py-2 rounded-xl transition-all duration-300
            ${
              selectedLanguage === lang
              ? "text-blue-400 bg-blue-500/20 ring-2 ring-blue-500/50"
              : "text-gray-400 hover:text-gray-300 bg-[#1e1e2e]/80 hover:bg-[#262637] ring-1 ring-gray-800"
            }
            `}
          >
          <div className="flex items-center gap-2.5">
            <img src={`/${lang}.png`} alt={lang} className="w-5 h-5 object-contain" />
            <span className="text-sm font-medium">{lang}</span>
          </div>
          </button>
        ))}

        {selectedLanguage && (
          <button
          onClick={() => setSelectedLanguage(null)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
          <X className="w-4 h-4" />
          Clear
          </button>
        )}

        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500">
          {filteredSnippets.length} snippets found
          </span>

          <div className="flex items-center gap-1 p-1.5 bg-[#1e1e2e]/80 rounded-xl ring-1 ring-gray-800 backdrop-blur-sm">
          <button
            onClick={() => setView("grid")}
            className={`p-2.5 rounded-lg transition-all ${
            view === "grid"
              ? "bg-blue-500/30 text-blue-400"
              : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2.5 rounded-lg transition-all ${
            view === "list"
              ? "bg-blue-500/30 text-blue-400"
              : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
          </div>
        </div>
        </div>
      </div>

      <motion.div
        className={`grid gap-8 ${
        view === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 max-w-3xl mx-auto"
        }`}
        layout
      >
        <AnimatePresence mode="popLayout">
        {filteredSnippets.map((snippet) => (
          <SnippetCard key={snippet._id} snippet={snippet} />
        ))}
        </AnimatePresence>
      </motion.div>

      {filteredSnippets.length === 0 && (
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-md mx-auto mt-24 p-10 rounded-3xl overflow-hidden bg-[#1e1e2e]/30 backdrop-blur-sm border border-gray-800"
        >
        <div className="text-center">
          <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br 
          from-blue-600/20 to-purple-600/20 ring-1 ring-white/10 mb-8"
          >
          <Code className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">No snippets found</h3>
          <p className="text-gray-400 mb-8 text-lg">
          {searchQuery || selectedLanguage
            ? "Try adjusting your search query or filters"
            : "Be the first to share a code snippet with the community"}
          </p>

          {(searchQuery || selectedLanguage) && (
          <button
            onClick={() => {
            setSearchQuery("");
            setSelectedLanguage(null);
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#262637] text-gray-300 hover:text-white rounded-xl 
            transition-colors hover:bg-[#2a2a3a]"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
          )}
        </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}
export default SnippetsPage;