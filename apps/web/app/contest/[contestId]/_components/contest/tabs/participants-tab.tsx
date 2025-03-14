import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@components/components/ui/avatar"
import { format } from "date-fns"

interface ParticipantsTabProps {
  participants: any
  waitlist: any
  participantLimit: number
  currentParticipants: number
}

export default function ParticipantsTab({
  participants,
  waitlist,
  participantLimit,
  currentParticipants,
}: ParticipantsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Registered Participants ({currentParticipants})</CardTitle>
          <CardDescription>{participantLimit - currentParticipants} spots remaining</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participants.map((participant:any) => (
              <div key={participant.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted hover-scale">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={participant.avatar} alt={participant.username} />
                  <AvatarFallback>{participant?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{participant.username}</div>
                  <div className="text-xs text-muted-foreground">
                    Joined {format(new Date(participant.registrationDate), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {participants.length > 9 && (
            <Button variant="outline" className="w-full mt-4 hover-scale">
              View All Participants
            </Button>
          )}
        </CardContent>
      </Card>

      {waitlist.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Waitlist ({waitlist.length})</CardTitle>
            <CardDescription>People waiting for available spots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {waitlist.map((participant:any) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted hover-scale"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{participant.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Joined waitlist on {format(new Date(participant.registrationDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Approve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

