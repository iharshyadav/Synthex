'use client';
import Link from "next/link";
import { BackgroundBeams } from "@components/ui/background-beams";
import { Button } from "@components/components/ui/button";



export default function NotFound() {
    return (
        <div className="h-screen w-full dark:bg-slate-900 bg-slate-950 relative flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center px-8">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 mb-8 animate-text-gradient">
                404
            </h1>
            <h2 className="text-4xl md:text-5xl max-w-2xl font-bold text-white mb-6 animate-fade-in">
                Oops! Lost in Space
            </h2>
            <p className="text-xl text-purple-200 max-w-xl mx-auto mb-10 animate-fade-in-up">
                Houston, we have a problem! The page you're looking for seems to have drifted into a black hole.
            </p>
            <div className="space-stars animate-twinkle absolute inset-0 opacity-50"></div>
            <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-10 py-5 text-lg rounded-xl 
                hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transform transition-all duration-300 
                animate-pulse-slow font-semibold">
                Return to Earth 🚀
                </Button>
            </Link>
            </div>
            <BackgroundBeams className="opacity-75" />
        </div>
    );
}