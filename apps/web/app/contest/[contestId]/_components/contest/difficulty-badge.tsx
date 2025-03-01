import { Badge } from "@components/components/ui/badge"
import { cn } from "@components/lib/utils"
import { Zap, Flame, Puzzle } from "lucide-react"

interface DifficultyBadgeProps {
  difficulty: string
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "hover-scale transition-all duration-300",
        difficulty === "Easy" && "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
        difficulty === "Medium" && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
        difficulty === "Hard" && "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
      )}
    >
      {difficulty === "Easy" && <Zap className="h-3 w-3 mr-1" />}
      {difficulty === "Medium" && <Flame className="h-3 w-3 mr-1" />}
      {difficulty === "Hard" && <Puzzle className="h-3 w-3 mr-1" />}
      {difficulty}
    </Badge>
  )
}

