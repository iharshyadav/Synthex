import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@components/components/ui/card"
import { Button } from "@components/components/ui/button"
import { Input } from "@components/components/ui/input"
import { Textarea } from "@components/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/components/ui/select"
import { Plus, Edit, Trash2, GripVertical, ArrowUp, ArrowDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@components/components/ui/dialog"
import { Label } from "@components/components/ui/label"
import { handleSubmit } from "app/contest/[contestId]/lib/createProblem"
import { Switch } from "@components/components/ui/switch"
import { useParams } from "next/navigation"

interface Problem {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  sampleInput?: string
  sampleOutput?: string
  images?: (string | File)[]
  timeLimit?: number
  memoryLimit?: number
  public : boolean
}

interface ProblemsManagementTabProps {
  problems: Problem[]
}

export default function ProblemsManagementTab({
  problems = [],
}: ProblemsManagementTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null)
  const [imagesState, setImagesState] = useState<(string | File)[]>([])
  const [fetchedImageUrls, setFetchedImageUrls] = useState<string[]>([])
  const params = useParams()
  const contestId = params.contestId as string
  
  const handleAddProblem = (formData: FormData) => {
    const newProblem = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      difficulty: formData.get("difficulty") as "easy" | "medium" | "hard",
      points: Number(formData.get("points")),
      sampleInput: formData.get("sampleInput") as string,
      sampleOutput: formData.get("sampleOutput") as string,
      public : Boolean(formData.get("public"))
    }
    
    // onAddProblem?.(newProblem)
    setIsAddDialogOpen(false)
  }
  
  const handleEditProblem = (formData: FormData) => {
    if (!editingProblem) return
    
    const updatedProblem = {
      ...editingProblem,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      difficulty: formData.get("difficulty") as "easy" | "medium" | "hard",
      points: Number(formData.get("points")),
      sampleInput: formData.get("sampleInput") as string,
      sampleOutput: formData.get("sampleOutput") as string,
      public : Boolean(formData.get("public"))
    }
    
    // onUpdateProblem?.(updatedProblem)
    setEditingProblem(null)
  }

  // const moveProblem = (index: number, direction: "up" | "down") => {
  //   if (!onReorderProblems) return
    
  //   const newProblems = [...problems]
  //   const newIndex = direction === "up" ? index - 1 : index + 1
    
  //   if (newIndex < 0 || newIndex >= problems.length) return
    
  //   const temp = newProblems[index] as Problem
  //   newProblems[index] = newProblems[newIndex] as Problem
  //   newProblems[newIndex] = temp
  //   onReorderProblems(newProblems)
  // }

  const ProblemForm = ({ problem, onSubmit }: { problem?: Problem, onSubmit: (formData: FormData) => void }) => {
    const [testCases, setTestCases] = useState<{ input: string, output: string, public : boolean }[]>(
      problem?.sampleInput && problem?.sampleOutput && problem?.public
        ? [{ input: problem.sampleInput, output: problem.sampleOutput , public : problem.public }]
        : [{ input: '', output: '' , public : false}]
    );

    const addTestCase = () => {
      setTestCases([...testCases, { input: '', output: '' , public : false}]);
    };

    const removeTestCase = (index: number) => {
      if (testCases.length > 1) {
        setTestCases(testCases.filter((_, i) => i !== index));
      }
    };

    const updateTestCase = (index: number, field: 'input' | 'output', value: string) => {
      const updatedTestCases = [...testCases];
      updatedTestCases[index]![field] = value;
      setTestCases(updatedTestCases);
    };

    return (
      <form 
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        imagesState.length > 0 && imagesState.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
          });
          testCases.length > 0 && formData.append(`testcases`, JSON.stringify(testCases))
          await handleSubmit(formData,contestId);
          setTestCases([{ input: '', output: '', public: false }]);
          setImagesState([]);
          e.currentTarget.reset();
          // onSubmit(formData);

          if (problem) {
            setEditingProblem(null);
          } else {
            setIsAddDialogOpen(false);
          }
      }}
       className="space-y-4 max-h-[70vh] overflow-y-auto p-2">
        <div className="space-y-2">
          <Label htmlFor="title">Problem Title</Label>
          <Input id="title" name="title" defaultValue={problem?.title || ""} required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Problem Description</Label>
          <Textarea id="description" name="description" defaultValue={problem?.description || ""} rows={5} required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select name="difficulty" defaultValue={problem?.difficulty || "medium"}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input id="points" name="points" type="number" defaultValue={problem?.points || 100} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
            <Input id="timeLimit" name="timeLimit" type="number" step="0.1" defaultValue={problem?.timeLimit || 2} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
            <Input id="memoryLimit" name="memoryLimit" type="number" defaultValue={problem?.memoryLimit || 256} required />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-base font-semibold">Problem Illustrations</Label>
          <div className="space-y-5">
            <div className="flex flex-col items-center justify-center w-full">
              <label
          htmlFor="imageUpload"
          className="group relative w-full h-40 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/70 bg-secondary/30 hover:bg-secondary/50"
              >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-2 transition-all duration-300 group-hover:scale-105">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
              <Plus className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">Drag images here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">Add diagrams, charts or illustrations to your problem</p>
            </div>
          </div>
            <input 
            id="imageUpload" 
            type="file" 
            name="images" 
            accept="image/*" 
            multiple 
            className="hidden" 
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.target.files && e.target.files.length > 0) {
              const newFiles = Array.from(e.target.files);
              const updatedFiles = [...(problem?.images || []), ...newFiles];
              setImagesState(updatedFiles);
              }
            }}
            />

              </label>
            </div>
            
            {/* Image preview gallery */}
            {imagesState.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {imagesState.map((image, index) => (
            <div key={index} className="group relative aspect-square rounded-lg border overflow-hidden bg-background shadow-sm hover:shadow-md transition-all duration-200">
              <img 
                src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
                alt={`Problem image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => {
              // Remove image function
            }}
                >
            <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Sample Test Cases</Label>
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              onClick={addTestCase}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Test Case
            </Button>
          </div>
          
            <div id="testCasesContainer" className="space-y-4">
            {testCases.map((testCase, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-md relative">
              <div className="absolute right-2 top-2 flex gap-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`public_${index}`}
                      checked={testCase.public || false}
                      onCheckedChange={(checked) => {
                        const updatedTestCases = [...testCases];
                        updatedTestCases[index]!.public = checked;
                        setTestCases(updatedTestCases);
                      }}
                    />
                    <Label 
                      htmlFor={`public_${index}`} 
                      className="text-xs font-medium cursor-pointer"
                    >
                      {!testCase.public ? "Public testcase" : "Hidden testcase"}
                    </Label>
                  </div>
                </div>
                <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTestCase(index)}
                disabled={testCases.length === 1}
                className="h-6 w-6 text-red-500"
                >
                <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`sampleInput_${index}`}>Sample Input {index + 1}</Label>
                <Textarea 
                id={`sampleInput_${index}`}
                value={testCase.input}
                onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`sampleOutput_${index}`}>Sample Output {index + 1}</Label>
                <Textarea 
                id={`sampleOutput_${index}`}
                value={testCase.output}
                onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                rows={3}
                />
              </div>
              </div>
            ))}
            </div>
        </div>
        
        <DialogFooter className="pt-4">
          <Button type="submit">{problem ? "Update Problem" : "Add Problem"}</Button>
        </DialogFooter>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Contest Problems</CardTitle>
              <CardDescription>Manage problems for this contest</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Problem</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Problem</DialogTitle>
                </DialogHeader>
                <ProblemForm onSubmit={handleAddProblem} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {problems.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No problems added to this contest yet.
              </div>
            ) : (
              problems.map((problem, index) => (
                <Card key={index}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-base">{problem.title}</CardTitle>
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <span className={`px-2 py-0.5 rounded-full ${
                            problem.difficulty === "easy" ? "bg-green-100 text-green-800" :
                            problem.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {problem.points} points
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          disabled={index === 0} 
                          // onClick={() => moveProblem(index, "up")}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          disabled={index === problems.length - 1} 
                          // onClick={() => moveProblem(index, "down")}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setEditingProblem(problem)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl p-3">
                            <DialogHeader>
                              <DialogTitle>Edit Problem</DialogTitle>
                            </DialogHeader>
                            <ProblemForm problem={problem} onSubmit={handleEditProblem} />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          // onClick={() => onDeleteProblem?.(problem.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
