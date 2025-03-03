"use client"
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundGradient } from "@components/ui/background-gradient";
import { SparklesCore } from "@components/ui/sparkles";
import { Input } from "@components/components/ui/input";
import { Button } from "@components/components/ui/button";
import { Search, Timer, Users, Trophy, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import NavigationHeader from "@components/NavigationHeader";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import ContestRulesModal from "./_components/ContestRulesModal";
import { IContest } from "types/contestType";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ContestPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = ["All", "Ongoing", "Upcoming", "Completed"];
  const [selectedContest, setSelectedContest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const {user} = useUser();
  const router = useRouter();

  const { data: contestsData, isLoading } = useQuery<IContest[] | undefined>({
    queryKey: ['contests'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/contest', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.data) {
          throw new Error('Failed to fetch contests');
        }

        // console.log(response.data)
        
        return response.data.data;
      } catch (error) {
        console.error('Error fetching contests:', error);
        throw error;
      }
    },
  });

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: Infinity,
  //     },
  //   },
  // })

  // queryClient.prefetchQuery({
  //   queryKey: ['contests'],
  //   queryFn: async () => {
  //     const response = await axios.get('/api/contest');
  //     if (!response.data) {
  //     throw new Error('Failed to fetch contests');
  //     }
  //     return response.data.data;
  //   }
  // });

  const handleJoinChallenge = (contest: IContest) => {
    setSelectedContest(contest);
    setIsModalOpen(true);
  };

  const joinContestMutation = useMutation({
    mutationFn: async (contestId: string) => {
      const response = await axios.post('/api/contest/joinContest', {
        contestId: contestId,
        name : user?.fullName
      });
      return response.data;
    },
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['contests'] });
      toast.success("Successfully joined contest");
    },
    onError: (error:any) => {
      console.error('Error joining contest:', error);
      toast.error("Failed to join contest");
    }
  });

  const handleAcceptRules = (contest: IContest) => {
    if (contest?._id) {
      // console.log(contest._id)
      joinContestMutation.mutate(contest._id);
    }
  };


  return (
    <>
      <NavigationHeader />
      <div className="min-h-screen mt-20 bg-gradient-to-b from-black to-zinc-900 antialiased relative">
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 pb-8">
          Competitive Programming Challenges
          </h1>
          <p className="text-zinc-300 text-xl mb-12 max-w-2xl mx-auto">
          Join elite developers in high-stakes coding competitions and showcase your skills
          </p>
          
          {/* Create Contest Button */}
          <Link href="/createContest">
            <Button 
            className="mb-12 relative group overflow-hidden px-8 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
            <span className="relative z-10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              Create Contest
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            </Link>
          
          {/* Enhanced Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
            <Input
            placeholder="Search contests..."
            className="pl-10 bg-zinc-800/50 border-zinc-700 h-12 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter.toLowerCase() ? "default" : "outline"}
              className={`bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 ${
              activeFilter === filter.toLowerCase() ? "bg-purple-500/20 text-purple-400" : ""
              }`}
              onClick={() => setActiveFilter(filter.toLowerCase())}
            >
              {filter}
            </Button>
            ))}
          </div>
          </div>
        </motion.div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(contestsData ?? []).filter((contest: any) => {
            const currentTime = new Date();
            const startTime = new Date(contest.startTime);
            const endTime = new Date(contest.endTime);

            if (activeFilter.toLowerCase() === 'ongoing') {
              return currentTime >= startTime && currentTime <= endTime;
            } else if (activeFilter.toLowerCase() === 'upcoming') {
              return currentTime < startTime;
            } else if (activeFilter.toLowerCase() === 'completed') {
              return currentTime > endTime;
            }
            return true;
            }).filter((contest: any) => {
            return contest.title.toLowerCase().includes(searchQuery.toLowerCase());
            }).map((contest: IContest) => (
            <motion.div
              key={contest._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5  rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative p-6 bg-zinc-900 rounded-xl backdrop-blur-sm h-full border border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    new Date() >= new Date(contest.startTime) && new Date() <= new Date(contest.endTime)
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : new Date() < new Date(contest.startTime)
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {new Date() >= new Date(contest.startTime) && new Date() <= new Date(contest.endTime)
                      ? "Ongoing"
                      : new Date() < new Date(contest.startTime)
                      ? "Upcoming"
                      : "Completed"}
                  </span>
                    <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-zinc-300 flex items-center gap-2 font-semibold bg-zinc-800/50 px-3 py-1 rounded-full"
                    >
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    {Array.isArray(contest.prizes) && contest.prizes.length > 0 
                      ? `${contest.prizes[0]?.reward}`
                      : "No prize"}
                    </motion.span>
                </div>

                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300 mb-3">
                  {contest.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{contest.description}</p>

                <div className="space-y-4"></div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full text-zinc-300">
                    <Timer className="h-4 w-4 text-purple-400" />
                    {new Date(contest.endTime).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full text-zinc-300">
                    <Users className="h-4 w-4 text-blue-400" />
                    {contest.participants?.length || 0} participants
                  </span>
                </div>

                {
                  user && contest.participants.filter((item) => item.userId == user.id).length > 0 ? 
                <Button 
                  className="w-full mt-4 relative group overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 text-white font-medium py-6"
                  onClick={() => router.push(`/contest/${contest._id}`)}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Open Challenge
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button> : 
                <Button 
                className="w-full mt-4 relative group overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 text-white font-medium py-6"
                onClick={() => handleJoinChallenge(contest)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Join Challenge
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
                }
              </div>
            </motion.div>
          ))}
          </div>
        </AnimatePresence>
        </div>
      </div>

      {selectedContest && (
        <ContestRulesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAccept={() => handleAcceptRules(selectedContest)}
        />
      )}
      </>
  );
}
