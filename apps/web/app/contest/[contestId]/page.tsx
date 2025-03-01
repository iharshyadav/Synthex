'use client'
import { FC, useState } from 'react'
import { Button } from '@components/components/ui/button'
import { Card } from '@components/components/ui/card'
import { Badge } from '@components/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/components/ui/tabs'
import { Clock, Users, Trophy, BookOpen, Code } from 'lucide-react'

interface ContestPageProps {
  params: {
    contestId: string
  }
}

const ContestPage: FC<ContestPageProps> = ({ params }) => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data (replace with actual API data)
  const contestData = {
    title: 'Advanced Coding Challenge 2024',
    status: 'Upcoming',
    startTime: '2024-02-20T10:00:00',
    duration: '2 hours',
    participants: 156,
    difficulty: 'Medium',
    description: 'Join this exciting coding contest to test your programming skills...'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Contest Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{contestData.title}</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge variant="outline" className="bg-green-100">
            {contestData.status}
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{contestData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{contestData.participants} participants</span>
          </div>
          <Badge variant="secondary">{contestData.difficulty}</Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contest Description</h2>
            <p className="text-gray-600 mb-6">{contestData.description}</p>
            
            <h3 className="text-lg font-semibold mb-3">Rules & Guidelines</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Participants must solve problems independently</li>
              <li>Multiple submissions are allowed</li>
              <li>Plagiarism will result in disqualification</li>
              <li>Time limit per problem: 1 second</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="problems">
          <Card className="p-6">
            <div className="space-y-4">
              {/* Problem list would go here */}
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <Code className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">Problem 1: Array Manipulation</h3>
                    <p className="text-sm text-gray-500">Difficulty: Easy</p>
                  </div>
                </div>
                <Button variant="outline">Solve</Button>
              </div>
              {/* Add more problems */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card className="p-6">
            {/* Leaderboard table would go here */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Rank</th>
                    <th className="text-left p-2">User</th>
                    <th className="text-left p-2">Score</th>
                    <th className="text-left p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add leaderboard entries */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Button */}
      <div className="fixed bottom-8 right-8">
        <Button size="lg" className="shadow-lg">
          Register for Contest
        </Button>
      </div>
    </div>
  )
}

export default ContestPage;