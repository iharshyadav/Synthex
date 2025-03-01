import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/components/ui/card"
import { DifficultyBadge } from "../difficulty-badge"
import { CategoryIcon } from "../category-icon"

interface ProblemsTabProps {
  problems: any
}

export default function ProblemsTab({ problems }: ProblemsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contest Problems</CardTitle>
          <CardDescription>Solve these problems during the contest period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {problems.map((problem:any, index : number) => (
              <Card key={index} className="hover-scale overflow-hidden">
                <div className="border-l-4 border-primary">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {problem.title}
                          <DifficultyBadge difficulty={problem.difficulty} />
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2">
                          <CategoryIcon category={problem.category} />
                          {problem.category} • {problem.points} points
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">Completion rate: {problem.completionRate}%</div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-4">{problem.description}</p>
                    <div className="text-xs text-muted-foreground mb-2">
                      <strong>Constraints:</strong> {problem.constraints}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Sample Input:</div>
                      <pre className="bg-muted dark:bg-muted/80 p-2 rounded text-xs overflow-x-auto">
                        {problem.sampleInput}
                      </pre>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium mb-1">Sample Output:</div>
                      <pre className="bg-muted dark:bg-muted/80 p-2 rounded text-xs overflow-x-auto">
                        {problem.sampleOutput}
                      </pre>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

