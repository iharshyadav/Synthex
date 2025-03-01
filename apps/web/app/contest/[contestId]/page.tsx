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

export default function ContestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [contest, setContest] = useState<any>(MOCK_CONTEST)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  // Toggle favorite status
  const handleToggleFavorite = () => {
    setContest({ ...contest, isFavorite: !contest.isFavorite })
  }

  // Toggle registration status
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

        {/* Contest Header */}
        <ContestHeader contest={contest} onToggleFavorite={handleToggleFavorite} />

        {/* Contest Info Cards */}
        <ContestInfoCards contest={contest} onToggleRegistration={handleToggleRegistration} />

        {/* Contest Details Tabs */}
        <ContestTabs contest={contest} />
      </div>
    </div>
  )
}

