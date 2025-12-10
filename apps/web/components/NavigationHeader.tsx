"use client";
import { SignedOut, useUser } from "@clerk/nextjs";
import HeaderProfileBtn from "app/editor/_components/HeaderProfileBtn";
import { Blocks, Code2, Sparkles, Menu, Command } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {user} = useUser();

  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl backdrop-saturate-150" />

      {/* Animated gradient border */}
      <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative h-16 sm:h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="group relative">
              <div
                className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 
                group-hover:opacity-100 blur-xl transition-all duration-700 group-hover:duration-200"
              />

              <div className="flex items-center gap-3 sm:gap-4">
                {/* Option 3: Command icon */}
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
            <nav className="hidden md:flex items-center ml-8">
              {["Snippets", "Editor", "Code Live", "Code Review","Dashboard" , "Contest"].map(
                (item) => (
                  <Link
                    key={item}
                    href={
                      item === "Code Live"
                        ? "/joinroom"
                        : item === "Code Review"
                          ? "/codereview"
                          : `/${item.toLowerCase()}`
                    }
                    className="relative group mx-2"
                  >
                    <div
                      className="absolute -inset-3 rounded-lg 
                opacity-0 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 group-hover:bg-blue-500/10 transition-all duration-300">
                      <Code2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transform group-hover:rotate-12 transition-transform" />
                      <span className="text-sm font-medium text-gray-300 group-hover:text-blue-200">
                        {item}
                      </span>
                    </div>
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <SignedOut>
              <Link href="/pricing" className="group relative hidden sm:flex">
                <div
                  className="absolute -inset-3 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                opacity-0 blur-sm transition-all duration-500"
                />
                <div
                  className="relative flex items-center gap-2 px-4 py-1.5 rounded-lg 
                bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                border border-white/10 group-hover:border-blue-500/50 
                hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <Sparkles
                    className="w-4 h-4 text-blue-400 group-hover:text-blue-300 
                transform group-hover:rotate-12 transition-all duration-300"
                  />
                  <span
                    className="text-sm font-medium bg-gradient-to-r from-gray-200 to-blue-200 
                bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200"
                  >
                    Upgrade
                  </span>
                </div>
              </Link>
            </SignedOut>

            <HeaderProfileBtn />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 
              hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <Menu className="w-5 h-5 text-gray-300 hover:text-blue-300 transition-colors" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10">
            <nav className="px-4 py-4 space-y-2">
              {["Snippets", "Editor", "Code Live", "Code Review","Dashboard" ,"Contest"].map(
                (item) => (
                  <Link
                    key={item}
                    href={
                      item === "Code Live"
                        ? "/joinroom"
                        : item === "Code Review"
                          ? "/codereview"
                          : `/${item.toLowerCase()}`
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">
                      {item}
                    </span>
                  </Link>
                )
              )}
              <SignedOut>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-200">
                    Upgrade to Pro
                  </span>
                </Link>
              </SignedOut>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationHeader;
