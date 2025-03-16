import { Card, CardContent, CardHeader, CardTitle } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { Progress } from "@components/components/ui/progress"
import { format } from "date-fns"
import { Calendar, Users, Trophy, Award, UserPlus, UserMinus, Rocket, BarChart3 } from "lucide-react"
import { IContest } from "types/contestType"
import { cn } from "@components/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"

interface ContestInfoCardsProps {
  // contest: any
  // onToggleRegistration: () => void
  contestsData : IContest | undefined
}

export default function ContestInfoCards({ contestsData }: ContestInfoCardsProps) {

  
  const {user} = useUser();
  const params = useParams();

  const router = useRouter();

  const handleSubmitRegistration = useMutation({
    mutationKey : ['ToggleRegistration'],
    mutationFn : async () => {
      await axios.post(`/api/contest/toggleContestParticipant?contestId=${params.contestId}&name=${user?.fullName}`)
      .then((data) => {
           console.log(data)
      })
      .catch((error : any) => {
        console.log(error)
      })
    }
  }
  )

  const registrationProgress = Math.floor(((contestsData?.participants || []).length / 100) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="hover-scale card-shadow bg-gradient-to-br from-background to-muted/30 dark:from-background dark:to-muted/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Contest Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Start:</span>
              <span className="text-sm font-medium">{contestsData?.startTime ? format(contestsData.startTime, "PPP p") : "TBD"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">End:</span>
              <span className="text-sm font-medium">{contestsData?.endTime ? format(contestsData.endTime, "PPP p") : "TBD"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Duration:</span>
              <span className="text-sm font-medium">
                {contestsData?.startTime && contestsData?.endTime ? 
                  Math.round((new Date(contestsData.endTime).getTime() - new Date(contestsData.startTime).getTime()) / (1000 * 60 * 60)) : "?"} hours
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale card-shadow bg-gradient-to-br from-background to-muted/30 dark:from-background dark:to-muted/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" />
            Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Registered:</span>
              <span className="text-sm font-medium">
                {contestsData?.participants?.length || 0} / {100}
              </span>
            </div>
            <Progress value={registrationProgress} className="h-2 bg-muted dark:bg-muted/50" />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Waitlist:</span>
              {/* <span className="text-sm font-medium">{contestsData?.waitlist?.length || 0} people</span> */}
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Entry Fee:</span>
              {/* <span className="text-sm font-medium">{(contestsData?.entryFee || 0) > 0 ? `$${contestsData?.entryFee}` : "Free"}</span> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale card-shadow bg-gradient-to-br from-background to-muted/30 dark:from-background dark:to-muted/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-primary" />
            Prizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {(contestsData?.prizes || []).map((prize:any) => (
              <div key={prize.position} className="flex justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  {prize.position === 1 && <Award className="h-3 w-3 mr-1 text-yellow-500" />}
                  {prize.position === 2 && <Award className="h-3 w-3 mr-1 text-gray-400" />}
                  {prize.position === 3 && <Award className="h-3 w-3 mr-1 text-amber-700" />}
                  {prize.position}
                  {prize.position === 1 ? "st" : prize.position === 2 ? "nd" : prize.position === 3 ? "rd" : "th"}{" "}
                  Place:
                </span>
                <span className="text-sm font-medium">{prize.reward}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-3 flex justify-end">
        {new Date() < (contestsData?.startTime || new Date()) && (
          <Button
            className={cn(
              "hover-scale",
              user?.id && (contestsData?.participants || []).filter((item) => item.userId === user.id).length > 0
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-gradient-to-r from-primary to-secondary hover:opacity-90",
            )}
            onClick={() => handleSubmitRegistration.mutate()}
          >
             {user?.id && (contestsData?.participants || []).filter((item) => item.userId === user.id).length > 0 ? (
              <>
                <UserMinus className="h-4 w-4 mr-2" />
                Withdraw
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Register Now
              </>
            )}
          </Button>
        )}

        {user?.id && (contestsData?.participants ?? []).filter((item) => item.userId === user.id).length > 0 && (
          <Button onClick={() => router.push(`/contest/${params.contestId}/questions`)} className="hover-scale bg-gradient-to-r ml-4 from-primary to-secondary hover:opacity-90">
            <Rocket className="h-4 w-4 mr-2" />
            Enter Contest
          </Button>
        )}

        {contestsData?.endTime && new Date() > contestsData.endTime && (
          <Button variant="outline" className="hover-scale">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Results
          </Button>
        )}
      </div>
    </div>
  )
}

