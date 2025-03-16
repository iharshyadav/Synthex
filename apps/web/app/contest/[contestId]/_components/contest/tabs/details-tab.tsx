import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/components/ui/card"
import { Target, Zap, Code, FileText, Info, AlertTriangle, Lightbulb, Shield } from "lucide-react"

interface DetailsTabProps {
}

export default function DetailsTab() {
  return (
    <div className="space-y-4">
      <Card>
      <CardHeader>
        <CardTitle>Contest Rules</CardTitle>
        <CardDescription>Please review all rules before participating</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0 mt-0.5">
          1
          </div>
          <span>All submissions must be original work. Plagiarism will result in disqualification.</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0 mt-0.5">
          2
          </div>
          <span>Submissions must be completed within the specified time limit.</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0 mt-0.5">
          3
          </div>
          <span>Maximum of three submission attempts are allowed per problem.</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0 mt-0.5">
          4
          </div>
          <span>Usage of third-party libraries must be declared in your submission comments.</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0 mt-0.5">
          5
          </div>
          <span>Collaboration between participants during the contest is strictly prohibited.</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0 mt-0.5">
          6
          </div>
          <span>The judges' decision is final and no appeals will be considered.</span>
        </li>
        </ul>
      </CardContent>
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>Judging Criteria</CardTitle>
        <CardDescription>How submissions will be evaluated</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Correctness (40%)
          </h4>
          <p className="text-sm text-muted-foreground">
          Solutions must produce correct outputs for all test cases.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Efficiency (30%)
          </h4>
          <p className="text-sm text-muted-foreground">
          Solutions will be evaluated based on time and space complexity.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          Code Quality (20%)
          </h4>
          <p className="text-sm text-muted-foreground">Clean, well-structured, and readable code is preferred.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Documentation (10%)
          </h4>
          <p className="text-sm text-muted-foreground">Proper comments and explanations of approach.</p>
        </div>
        </div>
      </CardContent>
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">This contest is part of the Spring 2025 Coding Championship series.</p>
        </div>
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm">Participants must have a verified account to be eligible for prizes.</p>
        </div>
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">We recommend reviewing the sample problems before the contest begins.</p>
        </div>
        <div className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">All submissions are checked for plagiarism using our automated system.</p>
        </div>
        </div>
      </CardContent>
      </Card>
    </div>
  )
}

