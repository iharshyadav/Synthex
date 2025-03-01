import { Code, Database, FileText, Cpu, GitBranch, Server, Brain, Laptop, Layers } from "lucide-react"

interface CategoryIconProps {
  category: string
}

export function CategoryIcon({ category }: CategoryIconProps) {
  switch (category) {
    case "Algorithms":
      return <Code className="h-4 w-4 text-primary" />
    case "Data Structures":
      return <Database className="h-4 w-4 text-primary" />
    case "Strings":
      return <FileText className="h-4 w-4 text-primary" />
    case "Dynamic Programming":
      return <Cpu className="h-4 w-4 text-primary" />
    case "Graphs":
      return <GitBranch className="h-4 w-4 text-primary" />
    case "System Design":
      return <Server className="h-4 w-4 text-primary" />
    case "Machine Learning":
      return <Brain className="h-4 w-4 text-primary" />
    case "Web Development":
      return <Laptop className="h-4 w-4 text-primary" />
    default:
      return <Layers className="h-4 w-4 text-primary" />
  }
}

