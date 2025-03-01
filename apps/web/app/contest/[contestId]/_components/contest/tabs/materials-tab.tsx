import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { Download, FileText, Code, BookOpen } from "lucide-react"

interface MaterialsTabProps {
  materials: any
}

export default function MaterialsTab({ materials }: MaterialsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contest Materials</CardTitle>
          <CardDescription>Download resources for this contest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {materials.map((material:any, index:any) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md border hover:bg-muted hover-scale"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">{material.name}</div>
                    <div className="text-xs text-muted-foreground">{material.size}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover-scale">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submission Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                File Format
              </h4>
              <p className="text-sm text-muted-foreground">
                Submit your solutions as a single ZIP file containing all source code files.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                Naming Convention
              </h4>
              <p className="text-sm text-muted-foreground">
                Name your files as problem_[number].[extension] (e.g., problem_1.py).
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Documentation
              </h4>
              <p className="text-sm text-muted-foreground">
                Include a README.md file explaining your approach for each problem.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

