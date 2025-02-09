'use client';
import { motion } from 'framer-motion';
import { Command } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    initialPercentage?: number;
    onComplete?: () => void;
}

export const Loader = ({ 
    size = 'medium', 
    color = '#6366f1', 
    initialPercentage = 0,
    onComplete 
}: LoaderProps) => {
    const [mounted, setMounted] = useState(false);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (percentage < 100) {
            const timer = setTimeout(() => {
                setPercentage(prev => Math.min(prev + 1, 100));
            }, 50);

            return () => clearTimeout(timer);
        } else {
            setIsComplete(true);
            onComplete?.();
        }
    }, [percentage, onComplete]);

    if (!mounted || isComplete) return null;

    const sizeMap = {
        small: '30px',
        medium: '50px',
        large: '70px',
    };

    const containerSize = sizeMap[size];

    return (
        <motion.div 
            className="fixed inset-0 flex flex-col items-center justify-center bg-black to-gray-900 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.h1 
                className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 mb-10 text-center leading-normal py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                    duration: 0.8,
                    ease: "easeOut",
                    backgroundPosition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            >
                <div className="group relative">
              <div className="absolute -inset-5 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 
                group-hover:opacity-100 blur-xl transition-all duration-700 group-hover:duration-200" />

              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-3 sm:p-3.5 rounded-xl sm:rounded-2xl 
                  ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  <Command className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400 group-hover:text-blue-300 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>

                <div className="relative hidden sm:block">
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                    bg-clip-text text-transparent filter drop-shadow-lg">
                    Synthex
                  </h1>
                </div>
              </div>
              </div>
            </motion.h1>
            
            <div className="relative flex flex-col items-center p-10 rounded-3xl">
                <div className="absolute to-purple-500/10 backdrop-blur-xl" />
                
                {[...Array(4)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            border: `4px solid ${color}`,
                            borderRadius: '50%',
                            borderTopColor: 'transparent',
                            borderLeftColor: index % 2 === 0 ? 'transparent' : color,
                            opacity: 1 - (index * 0.2),
                        }}
                        animate={{
                            rotate: index % 2 === 0 ? 360 : -360,
                            scale: [1, 0.9, 1],
                        }}
                        transition={{
                            duration: 2 - (index * 0.2),
                            repeat: percentage < 100 ? Infinity : 0,
                            ease: "easeInOut",
                            delay: index * 0.1,
                        }}
                    />
                ))}

                <motion.div
                    className="absolute"
                    style={{
                        width: '40%',
                        height: '40%',
                        top: '30%',
                        left: '30%',
                        background: `radial-gradient(circle, ${color}, transparent)`,
                        borderRadius: '50%',
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0.3, 0.7],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: percentage < 100 ? Infinity : 0,
                        ease: "easeInOut",
                    }}
                />
                
                <motion.div 
                    className="ml-5 text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                    animate={{
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: percentage < 100 ? Infinity : 0,
                        ease: "easeInOut",
                    }}
                >
                    {percentage}%
                </motion.div>
            </div>
            
            <motion.p 
                className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mt-6 font-medium tracking-wider py-5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                    y: 0, 
                    opacity: [0, 1, 0.8],
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            >
                Loading amazing experiences...
            </motion.p>
        </motion.div>
    );
};

export default Loader;