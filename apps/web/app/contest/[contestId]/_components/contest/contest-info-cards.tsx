import { Card, CardContent, CardHeader, CardTitle } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { Progress } from "@components/components/ui/progress"
import { format } from "date-fns"
import { Calendar, Users, Trophy, Award, UserPlus, UserMinus, Rocket, BarChart3 } from "lucide-react"
import { IContest } from "types/contestType"
import { cn } from "@components/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useParams } from "next/navigation"

interface ContestInfoCardsProps {
  contest: any
  onToggleRegistration: () => void
  contestsData : IContest[] | undefined
}

export default function ContestInfoCards({ contest, onToggleRegistration , contestsData }: ContestInfoCardsProps) {

  const {user} = useUser();
  const params = useParams();
  // Calculate registration progress percentage
  const registrationProgress = Math.floor((contest.currentParticipants / contest.participantLimit) * 100)

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
              <span className="text-sm font-medium">{format(contest.startTime, "PPP p")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">End:</span>
              <span className="text-sm font-medium">{format(contest.endTime, "PPP p")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Duration:</span>
              <span className="text-sm font-medium">
                {Math.round((contest.endTime.getTime() - contest.startTime.getTime()) / (1000 * 60 * 60))} hours
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
                {contest.currentParticipants} / {contest.participantLimit}
              </span>
            </div>
            <Progress value={registrationProgress} className="h-2 bg-muted dark:bg-muted/50" />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Waitlist:</span>
              <span className="text-sm font-medium">{contest.waitlist.length} people</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Entry Fee:</span>
              <span className="text-sm font-medium">{contest.entryFee > 0 ? `$${contest.entryFee}` : "Free"}</span>
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
            {contest.prizes.map((prize:any) => (
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
        {contest.status === "upcoming" && (
          <Button
            className={cn(
              "hover-scale",
              contest.isRegistered
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-gradient-to-r from-primary to-secondary hover:opacity-90",
            )}
            onClick={onToggleRegistration}

      //       {
      //         user && contest.participants.filter((item) => item.userId == user.id).length > 0 ? 
      //       <Button 
      //         className="w-full mt-4 relative group overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 text-white font-medium py-6"
      //         onClick={() => router.push(`/contest/${contest._id}`)}
      //       >
      //         <span className="relative z-10 flex items-center justify-center">
      //           Open Challenge
      //           <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      //         </span>
      //       </Button> : 
      //       <Button 
      //       className="w-full mt-4 relative group overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 text-white font-medium py-6"
      //       onClick={() => handleJoinChallenge(contest)}
      //     >
      //       <span className="relative z-10 flex items-center justify-center">
      //         Join Challenge
      //         <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      //       </span>
      //     </Button>
      //       }
      //     </div>
      //   </motion.div>
      // ))}
          >
             {user?.id && (contestsData?.find((item) => item._id === params.contestId)?.participants ?? []).filter((item) => item.userId === user.id).length > 0 ? (
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

        {contest.status === "active" && (
          <Button className="hover-scale bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Rocket className="h-4 w-4 mr-2" />
            Enter Contest
          </Button>
        )}

        {contest.status === "completed" && (
          <Button variant="outline" className="hover-scale">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Results
          </Button>
        )}
      </div>
    </div>
  )
}

