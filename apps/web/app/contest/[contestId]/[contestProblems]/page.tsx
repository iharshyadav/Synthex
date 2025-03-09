// 'use client';

// import { FC, useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { BackgroundGradient } from '@components/ui/background-gradient';
// import { CardBody, CardContainer, CardItem } from '@components/ui/3d-card';
// import { Button } from '@components/components/ui/button';
// import { MagneticButton } from '@components/ui/magnetic-button';
// import { Search, Filter, Clock, Award, Check, X, ChevronRight, Star } from 'lucide-react';
// import Link from 'next/link';
// import { cn } from '@components/lib/utils';
// import { useParams } from 'next/navigation';

// interface ContestProblemProps {
//   params: {
//     contestId: string;
//     contestProblems: string;
//   };
// }

// type Difficulty = 'Easy' | 'Medium' | 'Hard';

// interface Problem {
//   id: string;
//   title: string;
//   difficulty: Difficulty;
//   solved: boolean;
//   attempted: boolean;
//   acceptance: string;
//   tags: string[];
//   points: number;
// }

// const difficultyColor: Record<Difficulty, string> = {
//   Easy: 'text-green-500',
//   Medium: 'text-orange-500',
//   Hard: 'text-red-500',
// };

// const ContestProblemsPage: FC<ContestProblemProps> = ({ }) => {
//   const params = useParams();
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [contest, setContest] = useState({ title: '', timeLeft: '', totalPoints: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API fetch for contest and problems data
//     setTimeout(() => {
//       setContest({
//         title: 'Weekly Contest 123',
//         timeLeft: '01:45:30',
//         totalPoints: 2100
//       });
      
//       setProblems([
//         { id: '1', title: 'Two Sum', difficulty: 'Easy', solved: true, attempted: true, acceptance: '78%', tags: ['Array', 'Hash Table'], points: 300 },
//         { id: '2', title: 'Maximum Subarray', difficulty: 'Medium', solved: false, attempted: true, acceptance: '53%', tags: ['Array', 'Divide and Conquer'], points: 500 },
//         { id: '3', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', solved: false, attempted: false, acceptance: '67%', tags: ['Tree', 'DFS'], points: 400 },
//         { id: '4', title: 'Minimum Path Sum', difficulty: 'Medium', solved: false, attempted: false, acceptance: '48%', tags: ['DP', 'Array'], points: 500 },
//         { id: '5', title: 'Word Search II', difficulty: 'Hard', solved: false, attempted: false, acceptance: '32%', tags: ['Trie', 'Backtracking'], points: 900 },
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, [params.contestId]);

//   const filteredProblems = problems.filter(problem => 
//     problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center pb-4 border-b border-gray-200 dark:border-gray-800">
//         <div>
//         <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
//           {loading ? 'Loading contest...' : contest.title}
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400 mt-1">
//           Contest ID: {params.contestId}
//         </p>
//         </div>

//         <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2 text-sm">
//           <Clock size={16} className="text-gray-500" />
//           <span>{contest.timeLeft || '--:--:--'}</span>
//         </div>
        
//         <div className="flex items-center gap-2 text-sm ml-4">
//           <Award size={16} className="text-gray-500" />
//           <span>{contest.totalPoints || 0} Points</span>
//         </div>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center">
//         <div className="relative flex-1 w-full">
//         <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search problems by title or tags..."
//           className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         </div>
//         <Button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
//         <Filter size={16} />
//         <span>Filters</span>
//         </Button>
//       </div>

//       {/* Problems List */}
//       {loading ? (
//         <div className="flex justify-center py-10">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 dark:bg-gray-800">
//           <tr>
//             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
//             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Difficulty</th>
//             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Acceptance</th>
//             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Points</th>
//           </tr>
//           </thead>
//           <tbody>
//           {filteredProblems.map((problem, index) => (
//             <tr 
//             key={problem.id}
//             className={`border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/70`}
//             >
//             <td className="px-4 py-3">
//               <Link href={`/contest/${params.contestId}/problem/${problem.id}`} className="flex items-start gap-2">
//               <div className="mt-1">
//                 {problem.solved ? (
//                 <Check size={16} className="text-green-500" />
//                 ) : problem.attempted ? (
//                 <div className="h-2 w-2 rounded-full bg-orange-500"></div>
//                 ) : null}
//               </div>
//               <div>
//                 <div className="font-medium text-gray-900 dark:text-white">{problem.title}</div>
//                 <div className="mt-1 flex flex-wrap gap-1">
//                 {problem.tags.map((tag, idx) => (
//                   <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
//                   {tag}
//                   </span>
//                 ))}
//                 </div>
//               </div>
//               </Link>
//             </td>
//             <td className={`px-4 py-3 ${difficultyColor[problem.difficulty]}`}>
//               {problem.difficulty}
//             </td>
//             <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
//               {problem.acceptance}
//             </td>
//             <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
//               {problem.points}
//             </td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
        
//         {filteredProblems.length === 0 && (
//           <div className="text-center py-8 bg-gray-50 dark:bg-gray-800">
//           <p className="text-gray-500 dark:text-gray-400">No problems match your search criteria.</p>
//           </div>
//         )}
//         </div>
//       )}
      
//       {/* Footer Stats */}
//       <div className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm">
//         <div>
//         <p className="text-gray-700 dark:text-gray-300">Solved: <span className="text-green-600 dark:text-green-500 font-medium">{problems.filter(p => p.solved).length}/{problems.length}</span></p>
//         </div>
//         <div>
//         <p className="text-gray-700 dark:text-gray-300">Points earned: <span className="text-blue-600 dark:text-blue-500 font-medium">
//           {problems.filter(p => p.solved).reduce((sum, p) => sum + p.points, 0)}/{contest.totalPoints}
//         </span></p>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ContestProblemsPage;


"use client"

import React from "react"
import { type FC, useState, useEffect, useMemo } from "react"
import { Search, Filter, Clock, Award, Check, Moon, Sun, ArrowLeft, Zap, Flame, Brain } from "lucide-react"
import Link from "next/link"
import { cn } from "@components/lib/utils"
import { Button } from "@components/components/ui/button"
import { Badge } from "@components/components/ui/badge"
import { Skeleton } from "@components/components/ui/skeleton"
import { useParams } from "next/navigation"

interface ContestProblemProps {
  params: {
    contestId: string
    contestProblems: string
  }
}

type Difficulty = "Easy" | "Medium" | "Hard"

interface Problem {
  id: string
  title: string
  difficulty: Difficulty
  solved: boolean
  attempted: boolean
  acceptance: string
  tags: string[]
  points: number
}

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-green-500 dark:text-green-400",
  Medium: "text-orange-500 dark:text-orange-400",
  Hard: "text-red-500 dark:text-red-400",
}

const difficultyBgColor: Record<Difficulty, string> = {
  Easy: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  Medium: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  Hard: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
}

const difficultyIcon: Record<Difficulty, React.ReactElement> = {
  Easy: <Zap className="h-3.5 w-3.5" />,
  Medium: <Flame className="h-3.5 w-3.5" />,
  Hard: <Brain className="h-3.5 w-3.5" />,
}

const ContestProblemsPage: FC<ContestProblemProps> = ({}) => {
  const params = useParams();
  const [problems, setProblems] = useState<Problem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [contest, setContest] = useState({
    title: "",
    timeLeft: "",
    totalPoints: 0,
  })
  const [loading, setLoading] = useState(true)
  // const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{
    difficulty: Difficulty | null
    status: "all" | "solved" | "attempted" | "unsolved"
  }>({
    difficulty: null,
    status: "all",
  })
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [showFilters, setShowFilters] = useState(false)

  // Fetch contest data
  useEffect(() => {
    // Simulate API fetch for contest and problems data
    setLoading(true)

    setTimeout(() => {
      setContest({
        title: "Weekly Contest 123",
        timeLeft: "01:45:30",
        totalPoints: 2100,
      })

      const mockProblems = [
        {
          id: "1",
          title: "Two Sum",
          difficulty: "Easy" as Difficulty,
          solved: true,
          attempted: true,
          acceptance: "78%",
          tags: ["Array", "Hash Table"],
          points: 300,
        },
        {
          id: "2",
          title: "Maximum Subarray",
          difficulty: "Medium" as Difficulty,
          solved: false,
          attempted: true,
          acceptance: "53%",
          tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
          points: 500,
        },
        {
          id: "3",
          title: "Binary Tree Inorder Traversal",
          difficulty: "Easy" as Difficulty,
          solved: false,
          attempted: false,
          acceptance: "67%",
          tags: ["Tree", "Depth-First Search", "Binary Tree"],
          points: 400,
        },
        {
          id: "4",
          title: "Minimum Path Sum",
          difficulty: "Medium" as Difficulty,
          solved: false,
          attempted: false,
          acceptance: "48%",
          tags: ["Dynamic Programming", "Array", "Matrix"],
          points: 500,
        },
        {
          id: "5",
          title: "Word Search II",
          difficulty: "Hard" as Difficulty,
          solved: false,
          attempted: false,
          acceptance: "32%",
          tags: ["Trie", "Backtracking", "Matrix"],
          points: 900,
        },
      ]

      setProblems(mockProblems)
      setLoading(false)
    }, 1000)
  }, [params.contestId])

  // Update timer
  useEffect(() => {
    if (!contest.timeLeft || loading) return

    // Parse the initial time
    const [hoursStr, minutesStr, secondsStr] = contest.timeLeft.split(":")
    const hours = parseInt(hoursStr || "0", 10) || 0
    const minutes = parseInt(minutesStr || "0", 10) || 0
    const seconds = parseInt(secondsStr || "0", 10) || 0
    setTimeRemaining({ hours, minutes, seconds })

    // Set up the timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        let newSeconds = prev.seconds - 1
        let newMinutes = prev.minutes
        let newHours = prev.hours

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        if (newHours < 0) {
          clearInterval(timer)
          return { hours: 0, minutes: 0, seconds: 0 }
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [contest.timeLeft, loading])

  // Format time remaining
  const formattedTimeRemaining = useMemo(() => {
    const { hours, minutes, seconds } = timeRemaining
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, [timeRemaining])

  // Apply filters
  const filteredProblems = useMemo(() => {
    // First apply search
    let result = problems.filter(
      (problem) =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    // Then apply filters
    if (activeFilters.difficulty) {
      result = result.filter((problem) => problem.difficulty === activeFilters.difficulty)
    }

    if (activeFilters.status !== "all") {
      if (activeFilters.status === "solved") {
        result = result.filter((problem) => problem.solved)
      } else if (activeFilters.status === "attempted") {
        result = result.filter((problem) => !problem.solved && problem.attempted)
      } else if (activeFilters.status === "unsolved") {
        result = result.filter((problem) => !problem.solved && !problem.attempted)
      }
    }

    return result
  }, [problems, searchQuery, activeFilters])

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      difficulty: null,
      status: "all",
    })
    setSearchQuery("")
  }

  // Loading skeleton
  const ProblemSkeleton = () => (
    <div className="animate-pulse">
      <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="px-4 py-3 flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-48 mb-2" />
                  <div className="flex gap-1">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/contests"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Contests</span>
          </Link>

          {/* <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}
        </div>

        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white p-6 shadow-lg">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {loading ? <Skeleton className="h-8 w-64 bg-white/20" /> : contest.title}
                </h1>
                <p className="text-blue-100 mt-1">
                  {loading ? <Skeleton className="h-5 w-40 bg-white/20" /> : `Contest ID: ${params.contestId}`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm">
                  <Clock size={16} />
                  <span className="font-mono">{loading ? "--:--:--" : formattedTimeRemaining}</span>
                </div>

                <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm">
                  <Award size={16} />
                  <span>{loading ? "-- Points" : `${contest.totalPoints} Points`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems by title or tags..."
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                <div className="space-y-2">
                  {(["Easy", "Medium", "Hard"] as Difficulty[]).map((difficulty) => (
                    <div key={difficulty} className="flex items-center">
                      <input
                        type="radio"
                        id={`difficulty-${difficulty}`}
                        name="difficulty"
                        checked={activeFilters.difficulty === difficulty}
                        onChange={() =>
                          setActiveFilters((prev) => ({
                            ...prev,
                            difficulty: prev.difficulty === difficulty ? null : difficulty,
                          }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`difficulty-${difficulty}`} className={`text-sm ${difficultyColor[difficulty]}`}>
                        {difficulty}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Status</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Problems" },
                    { value: "solved", label: "Solved" },
                    { value: "attempted", label: "Attempted" },
                    { value: "unsolved", label: "Unsolved" },
                  ].map((status) => (
                    <div key={status.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`status-${status.value}`}
                        name="status"
                        checked={activeFilters.status === status.value}
                        onChange={() =>
                          setActiveFilters((prev) => ({
                            ...prev,
                            status: status.value as any,
                          }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`status-${status.value}`} className="text-sm">
                        {status.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Problems List */}
        {loading ? (
          <ProblemSkeleton />
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-all">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 text-left">
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Difficulty</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Acceptance</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProblems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center">
                          <Search size={24} className="mb-2 text-gray-400" />
                          <p>No problems match your search criteria.</p>
                          <Button variant="link" size="sm" onClick={resetFilters} className="mt-2">
                            Reset filters
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProblems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors">
                        <td className="px-4 py-3">
                          <Link
                            href={`/contest/${params.contestId}/problem/${problem.id}`}
                            className="flex items-start gap-2"
                          >
                            <div className="mt-1">
                              {problem.solved ? (
                                <Check size={16} className="text-green-500" />
                              ) : problem.attempted ? (
                                <div className="h-2 w-2 rounded-full bg-orange-500 mt-1.5"></div>
                              ) : null}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {problem.title}
                              </div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {problem.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className={`px-4 py-3 ${difficultyColor[problem.difficulty]}`}>
                          <Badge
                            variant="outline"
                            className={cn(difficultyBgColor[problem.difficulty], "flex items-center gap-1 w-fit")}
                          >
                            {difficultyIcon[problem.difficulty]}
                            {problem.difficulty}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{problem.acceptance}</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">{problem.points}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContestProblemsPage

