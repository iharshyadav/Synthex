import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@components/components/ui/avatar"
import { format } from "date-fns"

interface ParticipantsTabProps {
  participants: any
}

export default function ParticipantsTab({
  participants,
}: ParticipantsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Participants ({participants?.length || 0})</CardTitle>
              <CardDescription className="text-sm mt-1">
                <span className="font-medium text-primary">{100 - (participants?.length || 0)}</span> spots remaining
              </CardDescription>
            </div>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search participants..."
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {participants?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {participants?.map((participant: any) => (
                  <div 
                    key={participant.userId} 
                    className="flex items-center gap-4 p-3 rounded-lg border border-muted hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                      <AvatarImage src={participant.avatar} alt={participant.username} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {participant?.username?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-semibold flex items-center gap-2">
                        {participant.username}
                        {participant.isOnline && (
                          <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {participant.registrationDate ? 
                          `Joined ${format(new Date(participant.registrationDate), "MMM d, yyyy")}` : 
                          "Recently joined"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {participants.length > 9 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-6 group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  View All Participants
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium">No participants yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Be the first to register for this contest!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

