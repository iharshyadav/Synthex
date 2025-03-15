import { Button } from "@components/components/ui/button"
import { Card } from "@components/components/ui/card"
import { Badge } from "@components/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@components/components/ui/avatar"
import { Star, StarOff, Share2, Download, Edit, Trash2 } from "lucide-react"
import { IContest } from "types/contestType"
import { StatusBadge } from "./status-badge"
import { CategoryIcon } from "./category-icon"

interface ContestHeaderProps {
  contest: IContest | undefined
  creatorData : any
  // onToggleFavorite: () => void
}

export default function ContestHeader({ contest , creatorData }: ContestHeaderProps) {
  // console.log(contest)
  if(!contest) return null;
  return (
    <Card className="mb-8 overflow-hidden border-0 card-shadow">
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-1">
        <div className="bg-background p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
                  {contest.title}
                </h1>
                {/* <StatusBadge status={contest.status} /> */}
              </div>
              <p className="text-muted-foreground mt-2">{contest.description}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon"  className="hover-scale">
                {/* {contest.isFavorite ? (
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ) : (
                  <StarOff className="h-5 w-5" />
                )} */}
              </Button>
              <Button variant="ghost" size="icon" className="hover-scale">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-scale">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="hover-scale">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" className="hover-scale">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {/* {contest.categories.map((category:any) => (
              <Badge key={category} variant="secondary" className="hover-scale">
                <CategoryIcon category={category} />
                <span className="ml-1">{category}</span>
              </Badge>
            ))} */}
            <Badge variant="outline" className="hover-scale">
              {/* {contest.type.charAt(0).toUpperCase() + contest.type} */}
            </Badge>
          </div>

          <div className="mt-6 flex items-center">
            <Avatar className="h-8 w-8">
              {
                creatorData && (
                  <>
                  <AvatarImage src={creatorData.image_url} alt={creatorData.fullName} />
                  <AvatarFallback>{creatorData.first_name}</AvatarFallback>
                  </>
                )
              }
            </Avatar>
            <div className="ml-2">
              {
                creatorData &&
                <div className="text-sm font-medium">{creatorData.first_name}</div>
              }
              <div className="text-xs text-muted-foreground">Organizer</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

