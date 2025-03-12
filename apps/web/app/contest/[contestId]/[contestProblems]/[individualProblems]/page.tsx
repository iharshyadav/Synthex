"use client"

import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import { 
  Play,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  AlertCircle,
  CheckSquare,
  XSquare,
  Settings,
  MonitorSmartphone,
  Copy,
  Trash2,
  Plus,
  FileText,
  ListChecks,
  ChevronLeft
} from 'lucide-react';
import NavigationHeader from '@components/NavigationHeader';
import { submitContestCode } from './store/usecontestContext';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

function App() {
  const [code, setCode] = useState<string>("");
    
  
  const [output, setOutput] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [showOutput, setShowOutput] = useState(false);
  const [expandedTests, setExpandedTests] = useState<number[]>([0]);
  const [currentTest, setCurrentTest] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'testcases' | 'output'>('testcases');
  const editorRef = useRef<any>(null);
   const saveContestProblemResponse = useMutation(api.contestResult.saveContestProblemResponse);

  const testCases = [
    {
      id: 1,
      input: '[2,7,11,15], 9',
      expectedOutput: '[0,1]',
      status: 'pending',
      runtime: null,
      memory: null
    },
    {
      id: 2,
      input: '[3,2,4], 6',
      expectedOutput: '[1,2]',
      status: 'pending',
      runtime: null,
      memory: null
    },
    {
      id: 3,
      input: '[3,3], 6',
      expectedOutput: '[0,1]',
      status: 'pending',
      runtime: null,
      memory: null
    }
  ];

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const copyCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      navigator.clipboard.writeText(code);
    }
  };

  const clearCode = () => {
    if (editorRef.current) {
      editorRef.current.setValue('');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  const toggleTestCase = (id: number) => {
    setExpandedTests(prev => 
      prev.includes(id) 
        ? prev.filter(testId => testId !== id)
        : [...prev, id]
    );
  };

  const runCode = async () => {
    setShowOutput(true);
    setActiveTab('output');
    setOutput('');

    if (!code.trim()) {
      setOutput('Error: Code cannot be empty. Please write some code before running.');
      return;
    }

    try {
      const languageIdMap: Record<string, number> = {
        javascript: 63,
        python: 71,
        java: 62,
        cpp: 54
      };
      
      const languageId = languageIdMap[language];
      if (!languageId) {
        setOutput(`Error: Unsupported language "${language}".`);
        return;
      }

      const encodedCode = btoa(code);
      const cases = [
        {
            "input": "4 5 6 7\n11",
            "expected_output": "Indices: 1, 2\n",
            "hidden": false
        },
        {
            "input": "1 2 3 4 5\n9",
            "expected_output": "Indices: 3, 4\n",
            "hidden": false
        },
        {
            "input": "3 2 4\n6",
            "expected_output": "Indices: 1, 2\n",
            "hidden": false
        },
        {
            "input": "2 7 11 15\n9",
            "expected_output": "Indices: 0, 1\n",
            "hidden": false
        },
        {
            "input": "1 3 4 2\n6",
            "expected_output": "Indices: 1, 2\n",
            "hidden": false
        },
        {
            "input": "-3 4 3 90\n0",
            "expected_output": "Indices: 0, 2\n",
            "hidden": true
        },
        {
            "input": "0 4 3 0\n0",
            "expected_output": "Indices: 0, 3\n",
            "hidden": true
        },
        {
            "input": "1000000 999999 1 2\n1000001",
            "expected_output": "Indices: 0, 2\n",
            "hidden": true
        },
        {
            "input": "1 2 3 4 5 6 7 8 9 10\n19",
            "expected_output": "Indices: 8, 9\n",
            "hidden": true
        }
      ]    
      const res = await submitContestCode(encodedCode, languageId, cases, "67c2d5d7ffc93856938e13f4", "1");
      console.log(res,"hatsh");
      
      // if (res && res.output) {
      //   setOutput(res.output);
      // } else if (res && res.error) {
      //   setOutput(`Error: ${res.error}`);
      // }

      const contestId = "67c2d5d7ffc93856938e13f4";
      const problemId = "1";

      if (contestId && problemId) {
        try {
            await saveContestProblemResponse({
                contestId,
                problemId,
                code,
                token: [res.toString()],
                status: 'PROCESSING',
                language: String(languageId),
                executionTime : 123,
                memory : 128000
            });
        } catch (dbError) {
            console.error('Error saving submission to database:', dbError);
        }
    }
    

    } catch (error) {
      console.error(error);
      setOutput(`Error submitting code: ${error instanceof Error ? error.message : String(error)}`);
    }
    //     {
    //         "input": "1000 2000 3000 4000 5000\n7000",
    //         "expected_output": "Indices: 2, 4\n",
    //         "hidden": true
    //     },
    //     {
    //         "input": "-10 -20 -30 -40 -50\n-70",
    //         "expected_output": "Indices: 2, 4\n",
    //         "hidden": true
    //     }
    // ]
    
    for (let i = 0; i < testCases.length; i++) {
      setCurrentTest(i);
      setOutput(prev => prev + `\nRunning test case ${i + 1}...\n`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const passed = Math.random() > 0.3;
      const runtime = Math.floor(Math.random() * 100) + 50;
      const memory = Math.floor(Math.random() * 10) + 40;
      
      setOutput(prev => prev + `${passed ? '✓' : '✗'} Test Case ${i + 1}: ${passed ? 'PASSED' : 'FAILED'}\n`);
      if (!passed) {
        setOutput(prev => prev + `  Expected: ${testCases[i]?.expectedOutput}\n  Actual: [2,11]\n`);
      }
      setOutput(prev => prev + `  Runtime: ${runtime}ms\n  Memory: ${memory}MB\n\n`);
    }
    
    setCurrentTest(null);
  };

  const submitCode = async () => {
    setShowOutput(true);
    setActiveTab('output');
    setOutput('Submitting solution...\n');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOutput(prev => prev + '\nAll test cases passed!\n\nRuntime: 76ms (faster than 85.16%)\nMemory: 42.1MB (less than 74.32%)\n');
  };

  return (
    <>
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col">
      <nav className="bg-[#2C2C2C] border-b border-[#3E3E3E] px-4 py-2 flex items-center justify-between fixed w-full top-0 z-10">
        <div className="flex items-center">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-[#D4D4D4] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={runCode} className="px-4 py-1.5 bg-emerald-600 text-white rounded text-sm           font-medium hover:bg-emerald-700 transition-colors flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Run
          </button>
          <button onClick={submitCode} className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Submit
          </button>
          <button className="p-1.5 hover:bg-[#3E3E3E] rounded transition-colors">
            <Settings className="w-5 h-5 text-[#D4D4D4]" />
          </button>
          <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:opacity-90 transition-opacity">
            Premium
          </button>
        </div>
      </nav>

      <div className="flex flex-1 mt-14">
        <div className="w-[45%] border-r border-[#3E3E3E] overflow-y-auto">
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-2xl font-medium text-[#D4D4D4] mb-4">Two Sum</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">Easy</span>
                <span className="text-[#858585]">Acceptance Rate: 49.2%</span>
                <span className="text-[#858585]">Submissions: 1.2M</span>
              </div>
              
              <div className="mb-8">
                <p className="text-[#D4D4D4] mb-4">
                  Given an array of integers <code className="bg-[#2C2C2C] px-1.5 py-0.5 rounded">nums</code> and an integer <code className="bg-[#2C2C2C] px-1.5 py-0.5 rounded">target</code>, return indices of the two numbers such that they add up to <code className="bg-[#2C2C2C] px-1.5 py-0.5 rounded">target</code>.
                </p>
                <p className="text-[#D4D4D4] mb-4">
                  You may assume that each input would have exactly one solution, and you may not use the same element twice.
                </p>
                <p className="text-[#D4D4D4]">
                  You can return the answer in any order.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-[#D4D4D4] mb-4">Example 1:</h2>
                <div className="bg-[#2C2C2C] p-4 rounded-lg mb-4">
                  <p className="text-[#D4D4D4] mb-2">
                    <strong>Input:</strong> nums = [2,7,11,15], target = 9
                  </p>
                  <p className="text-[#D4D4D4]">
                    <strong>Output:</strong> [0,1]
                  </p>
                  <p className="text-[#858585] mt-2">
                    <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-[#D4D4D4] mb-4">Example 2:</h2>
                <div className="bg-[#2C2C2C] p-4 rounded-lg mb-4">
                  <p className="text-[#D4D4D4] mb-2">
                    <strong>Input:</strong> nums = [3,2,4], target = 6
                  </p>
                  <p className="text-[#D4D4D4]">
                    <strong>Output:</strong> [1,2]
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-[#D4D4D4] mb-4">Example 3:</h2>
                <div className="bg-[#2C2C2C] p-4 rounded-lg mb-4">
                  <p className="text-[#D4D4D4] mb-2">
                    <strong>Input:</strong> nums = [3,3], target = 6
                  </p>
                  <p className="text-[#D4D4D4]">
                    <strong>Output:</strong> [0,1]
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-[#D4D4D4] mb-4">Constraints:</h2>
                <ul className="list-disc list-inside text-[#D4D4D4] space-y-2">
                  <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
                  <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
                  <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
                  <li>Only one valid answer exists.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#D4D4D4] mb-4">Follow-up:</h2>
                <p className="text-[#D4D4D4]">
                  Can you come up with an algorithm that is less than O(n²) time complexity?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="sticky top-14 z-10 bg-[#1E1E1E]">
            <div className="editor-wrapper h-[60vh]">
              <div className="editor-toolbar">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-select"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <button onClick={toggleTheme} className="toolbar-button" title="Toggle theme">
                  <MonitorSmartphone className="w-4 h-4" />
                </button>
                <button onClick={copyCode} className="toolbar-button" title="Copy code">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={clearCode} className="toolbar-button" title="Clear code">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                options={{
                  fontFamily: "'Fira Code', 'Source Code Pro', monospace",
                  fontSize: 14,
                  lineNumbers: 'on',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                  folding: true,
                  foldingStrategy: 'indentation',
                  renderLineHighlight: 'all',
                  matchBrackets: 'always',
                  autoIndent: 'full',
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
          </div>

            <div className="h-[40vh] bottom-0 bg-[#1E1E1E] border-t border-[#3E3E3E] overflow-auto">
            <div className="flex h-full">
              <div className="w-48 bg-[#2C2C2C] border-r border-[#3E3E3E] flex flex-col">
              <button
                onClick={() => setActiveTab('testcases')}
                className={`px-4 py-2 text-left text-sm flex items-center ${
                activeTab === 'testcases'
                  ? 'bg-[#3E3E3E] text-white'
                  : 'text-[#858585] hover:bg-[#3E3E3E] hover:text-white'
                } transition-colors`}
              >
                <ListChecks className="w-4 h-4 mr-2" />
                Test Cases
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-4 py-2 text-left text-sm flex items-center ${
                activeTab === 'output'
                  ? 'bg-[#3E3E3E] text-white'
                  : 'text-[#858585] hover:bg-[#3E3E3E] hover:text-white'
                } transition-colors`}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Output
              </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
              {activeTab === 'testcases' && (
                <div className="h-full bg-[#1E1E1E] p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#D4D4D4] font-medium">Test Cases</h2>
                  <button className="p-1 hover:bg-[#3E3E3E] rounded transition-colors text-[#D4D4D4]">
                  <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {testCases.map((test, index) => (
                  <div
                    key={test.id}
                    className={`border border-[#3E3E3E] rounded-lg overflow-hidden ${
                    currentTest === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <button
                    className="w-full px-4 py-2 flex items-center justify-between text-[#D4D4D4] hover:bg-[#3E3E3E] transition-colors"
                    onClick={() => toggleTestCase(test.id)}
                    >
                    <span className="flex items-center">
                      {expandedTests.includes(test.id) ? (
                      <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      Test Case {test.id}
                    </span>
                    {test.status === 'passed' ? (
                      <CheckSquare className="w-4 h-4 text-green-400" />
                    ) : test.status === 'failed' ? (
                      <XSquare className="w-4 h-4 text-red-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#858585]" />
                    )}
                    </button>
                    {expandedTests.includes(test.id) && (
                    <div className="px-4 py-2 bg-[#1E1E1E] border-t border-[#3E3E3E]">
                      <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-[#858585]">Input:</span>
                        <pre className="mt-1 text-[#D4D4D4]">{test.input}</pre>
                      </div>
                      <div>
                        <span className="text-[#858585]">Expected Output:</span>
                        <pre className="mt-1 text-[#D4D4D4]">{test.expectedOutput}</pre>
                      </div>
                      {test.runtime && (
                        <div className="flex items-center space-x-4 text-[#858585]">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {test.runtime}ms
                        </span>
                        <span className="flex items-center">
                          <Cpu className="w-3 h-3 mr-1" />
                          {test.memory}MB
                        </span>
                        </div>
                      )}
                      </div>
                    </div>
                    )}
                  </div>
                  ))}
                </div>
                </div>
              )}
              {activeTab === 'output' && (
                <div className="h-full bg-[#1E1E1E] p-4">
                {showOutput ? (
                  <div className="h-full bg-[#2C2C2C] rounded-lg p-4 font-mono text-sm overflow-y-auto border border-[#3E3E3E]">
                  <pre className="text-[#D4D4D4] whitespace-pre-wrap">{output}</pre>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-[#858585]">
                  <div className="text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <p>Run your code to see the output</p>
                  </div>
                  </div>
                )}
                </div>
              )}
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;