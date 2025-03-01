import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { format } from "date-fns"
import { MessageSquare, Sparkles } from "lucide-react"

interface UpdatesTabProps {
  updates: any
}

export default function UpdatesTab({ updates }: UpdatesTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contest Updates</CardTitle>
          <CardDescription>Latest announcements and changes</CardDescription>
        </CardHeader>
        <CardContent>
          {updates.length > 0 ? (
            <div className="space-y-6">
              {updates.map((update:any) => (
                <div key={update.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      {update.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{format(update.date, "MMM d, yyyy")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No updates yet</h3>
              <p className="text-muted-foreground mt-2">Check back later for contest announcements</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Contest Updates</div>
                <div className="text-xs text-muted-foreground">Receive emails about changes to this contest</div>
              </div>
              <Button variant="outline" className="hover-scale">
                Subscribe
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Start Reminder</div>
                <div className="text-xs text-muted-foreground">Get notified 24 hours before the contest begins</div>
              </div>
              <Button variant="outline" className="hover-scale">
                Enable
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

