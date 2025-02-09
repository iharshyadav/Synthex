"use client"
import NavigationHeader from "@components/NavigationHeader";
import { SparklesCore } from "@components/ui/sparkles";
import { TracingBeam } from "@components/ui/tracing-beam";
import { BackgroundBeams } from "@components/ui/background-beams";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@components/loader";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* <BackgroundBeams /> */}
      <NavigationHeader />
      
      <main className="mx-auto px-4 py-40 relative">
        <section className="text-center w-full h-[90vh] relative flex items-center justify-center overflow-hidden">
          {/* Subtle background effects */}
          <div className="absolute inset-0">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.4}
              maxSize={1.0}
              particleDensity={50}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-80" />

          <div className="h-[30rem] w-full max-w-6xl mx-auto px-4 relative z-10">
            {/* Subtle gradient orbs */}
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse delay-700" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-8"
            >
              <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold tracking-tight"
              >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#ec4899]">
            Build the Future
          </span>
          <br />
          <TracingBeam className="mt-2">
            <span className="text-white">
              With Us
            </span>
          </TracingBeam>
              </motion.h1>
              
              <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              >
          Experience the future of development with our
          <span className="text-blue-400 font-medium"> innovative </span> 
          cloud platform designed for modern developers.
              </motion.p>

              <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 justify-center"
              >
         <Link href="/editor">
         <motion.button 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#ec4899] rounded-lg font-medium text-base transition-all duration-300"
          >
            Get Started Free
          </motion.button>
         </Link>
            <Link href="/pricing">
              <motion.button 
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-medium text-base
                hover:border-white/30 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Go Pro</span>
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: 3 }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-12">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-300" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-12 backdrop-blur-2xl border border-gray-800/50 shadow-[0_0_50px_rgba(0,0,255,0.1)]"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left space-y-6 flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-bold leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#ec4899]">
                Transform Your Coding Journey Today
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-xl"
            >
              Join our community of 10,000+ developers and experience the future of collaborative coding.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-4"
            >
              <motion.button 
                whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#ec4899] rounded-xl font-bold text-lg transition-all duration-300"
              >
                Get Started Free
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                View Demo →
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
            <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm text-gray-400">demo.tsx</div>
              </div>
              <pre className="text-sm text-gray-300">
                <code>{`const CodeExample = () => {
        return (
          <div className="space-y-4">
            <h1>Hello, Developer!</h1>
            // Start coding here
          </div>
        );
      };`}</code>
              </pre>
            </div>
          </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-32 relative">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />
          
          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden"></div>
            <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000" />
          

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Powerful Features
              </h2>
              <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the next generation of collaborative coding with our cutting-edge features
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {[
                {
                  title: "Live Collaboration",
                  description: "Code in real-time with your team. Share, edit, and debug together instantly with zero latency.",
                  icon: "⚡",
                  gradient: "from-blue-600 to-cyan-400",
                  features: ["Real-time editing", "Video calls", "Chat integration"]
                },
                {
                  title: "Competitive Arena",
                  description: "Challenge yourself in global coding competitions. Rise through the ranks and showcase your skills.",
                  icon: "🏆",
                  gradient: "from-purple-600 to-pink-400",
                  features: ["Daily challenges", "Global leaderboard", "Skill assessment"]
                },
                {
                  title: "AI Assistant",
                  description: "Get intelligent code suggestions and real-time error detection powered by advanced AI.",
                  icon: "🤖",
                  gradient: "from-green-600 to-emerald-400",
                  features: ["Smart completion", "Error prevention", "Code optimization"]
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-black border border-gray-800/50 backdrop-blur-sm
                    hover:border-gray-700/50 transition-all duration-500 group-hover:translate-y-[-8px]">
                    
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-6xl mb-6"
                    >
                      {feature.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-8 space-y-3">
                      {feature.features.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-400">
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium
                        opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      Learn More →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* New Enhanced Sections */}
        <section className="mt-32 text-center relative py-20">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-900/20 to-black/50" />
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 space-y-6 max-w-7xl mx-auto px-4"
          >
            <h2 className="text-7xl md:text-8xl font-bold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#ec4899] animate-gradient">
          Why Choose Us?
              </span>
            </h2>
            <p className="text-gray-300 text-2xl max-w-3xl mx-auto font-light">
              Experience the future of collaborative coding with our 
              <span className="text-blue-400 font-medium"> revolutionary </span> 
              features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 relative z-10 max-w-7xl mx-auto px-4">
            {[
              {
          title: "Seamless Collaboration",
          description: "Real-time pair programming with instant code sharing and integrated communication tools.",
          icon: "👥",
          gradient: "from-[#3b82f6] to-[#2dd4bf]",
          features: ["Real-time editing", "Video conferencing", "Team chat"],
          delay: 0
              },
              {
          title: "Lightning Fast Performance",
          description: "Sub-millisecond latency powered by cutting-edge technology for maximum efficiency.",
          icon: "⚡",
          gradient: "from-[#8b5cf6] to-[#ec4899]",
          features: ["Near-zero latency", "Optimized runtime", "Quick deployment"],
          delay: 0.2
              },
              {
          title: "Enterprise Security",
          description: "Bank-grade encryption and advanced security protocols to protect your intellectual property.",
          icon: "🔒",
          gradient: "from-[#6366f1] to-[#ec4899]",
          features: ["End-to-end encryption", "SOC2 compliance", "Regular audits"],
          delay: 0.4
              }
            ].map((item, i) => (
              <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: item.delay }}
          className="group relative perspective-1000"
              >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
          
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/95 to-black border border-gray-800/50 backdrop-blur-xl
              hover:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-7xl mb-8"
            >
              {item.icon}
            </motion.div>

            <h3 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.gradient}`}>
              {item.title}
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed text-lg">
              {item.description}
            </p>

            <div className="mt-8 space-y-4">
              {item.features.map((feature, index) => (
                <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 + index * 0.2 }}
            className="flex items-center gap-3 text-gray-300"
                >
            <span className={`bg-gradient-to-r ${item.gradient} p-1 rounded-full`}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-10 px-8 py-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white font-medium
                opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg hover:shadow-xl`}
            >
              Explore →
            </motion.button>
          </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
  
      </main>
    </div>
  );
}
