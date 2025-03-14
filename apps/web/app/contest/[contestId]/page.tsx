"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@components/components/ui/button"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import { useEffect } from "react"
import ContestHeader from "./_components/contest/contest-header"
import ContestInfoCards from "./_components/contest/contest-info-cards"
import ContestTabs from "./_components/contest/contest-tabs"
import { MOCK_CONTEST } from "./_components/contest/mock-data"
import NavigationHeader from "@components/NavigationHeader"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { useUser } from "@clerk/nextjs"
import { IContest } from "types/contestType"

export default function ContestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [contest, setContest] = useState<any>(MOCK_CONTEST)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const handleToggleFavorite = () => {
    setContest({ ...contest, isFavorite: !contest.isFavorite })
  }

  const handleToggleRegistration = () => {
    setContest({ ...contest, isRegistered: !contest.isRegistered })
  }

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const joinContestMutation = useMutation({
    mutationFn: async (contestId: string) => {
      const response = await axios.post('/api/contest/joinContest', {
        contestId: contestId,
        // name : user?.fullName
      });
      return response.data;
    },
    onSuccess: () => {
      // setIsModalOpen(false);
      // queryClient.invalidateQueries({ queryKey: ['contests'] });
      toast.success("Successfully joined contest");
    },
    onError: (error:any) => {
      console.error('Error joining contest:', error);
      toast.error("Failed to join contest");
    }
  });

  const {user} = useUser();

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

        console.log(response.data)
        
        return response.data.data;
      } catch (error) {
        console.error('Error fetching contests:', error);
        throw error;
      }
    },
  });

  useEffect(() => {
    console.log(contestsData)

  },[contestsData])


  if(contestsData == undefined) return null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
          <NavigationHeader />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="hover-scale mr-4 transition-all duration-300"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contests
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full transition-all duration-300"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <ContestHeader contest={contestsData} onToggleFavorite={handleToggleFavorite} />

        {/* <ContestInfoCards contestsData={contestsData} onToggleRegistration={handleToggleRegistration} /> */}

        <ContestTabs contest={contestsData} />
      </div>
    </div>
  )
}

