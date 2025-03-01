import { Badge } from "@components/components/ui/badge"
import { CheckCircle2, HourglassIcon, Clock } from "lucide-react"
import { cn } from "@components/lib/utils"

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant={status === "active" ? "default" : status === "upcoming" ? "secondary" : "outline"}
      className={cn(
        "hover-scale transition-all duration-300",
        status === "active" && "bg-green-500 dark:bg-green-600 text-white",
        status === "upcoming" && "bg-blue-500 dark:bg-blue-600 text-white",
        status === "completed" && "bg-gray-500 dark:bg-gray-600 text-white",
      )}
    >
      {status === "active" && <CheckCircle2 className="h-3 w-3 mr-1" />}
      {status === "upcoming" && <HourglassIcon className="h-3 w-3 mr-1" />}
      {status === "completed" && <Clock className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

