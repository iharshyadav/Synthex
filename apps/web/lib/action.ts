"use server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const runLiveCode = async (language: string, code: string) => {
  if (!code) {
    return { error: "Please enter some code" };
  }

  // set({ isRunning: true, error: null, output: "" });

  try {
    const languageConfig = "javascript";
    if (!languageConfig) {
      return { error: "Unsupported language" };
    }
    const runtime = { language: "javascript", version: "18.15.0" };
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ content: code }],
      }),
    });

    const data = await response.json();

    if (data.message) {
      return {
        error: data.message,
        executionResult: { code, output: "", error: data.message },
      };
    }

    if (data.compile && data.compile.code !== 0) {
      const error = data.compile.stderr || data.compile.output;
      // set({
      //   error,
      //   executionResult: {
      //     code,
      //     output: "",
      //     error,
      //   },
      // });
      return;
    }

    if (data.run && data.run.code !== 0) {
      const error = data.run.stderr || data.run.output;
      const filteredError = error
        .split("\n")
        .map((line: string, index: number) => {
          if (line.includes("/piston/jobs/")) {
            return `Line ${index + 1}: ${line.split("/piston/jobs/")[1]}`;
          }
          return line;
        })
        .join("\n");
      // console.log(filteredError);
      // console.log(error)
      // set({
      //   error:filteredError,
      //   executionResult: {
      //     code,
      //     output: "",
      //     error,
      //   },
      // });
      return;
    }

    const output = data.run.output;

    console.log(output);

    //   set({
    //     output: output.trim(),
    //     error: null,
    //     executionResult: {
    //       code,
    //       output: output.trim(),
    //       error: null,
    //     },
    //   });
  } catch (error) {
    console.log("Error running code:", error);
    //   set({
    //     error: "Error running code",
    //     executionResult: { code, output: "", error: "Error running code" },
    //   });
  } finally {
    //   set({ isRunning: false });
  }
};


export const generateReview = async (code: string) => {
  try {

    if (!process.env.GOOGLE_GEMINI_KEY) {
      throw new Error('GOOGLE_GEMINI_KEY is not defined in environment variables');
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `
                Here’s a solid system instruction for your AI code reviewer:

                AI System Instruction: Senior Code Reviewer (7+ Years of Experience)

                Role & Responsibilities:

                You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
                	•	Code Quality :- Ensuring clean, maintainable, and well-structured code.
                	•	Best Practices :- Suggesting industry-standard coding practices.
                	•	Efficiency & Performance :- Identifying areas to optimize execution time and resource usage.
                	•	Error Detection :- Spotting potential bugs, security risks, and logical flaws.
                	•	Scalability :- Advising on how to make code adaptable for future growth.
                	•	Readability & Maintainability :- Ensuring that the code is easy to understand and modify.

                Guidelines for Review:
                	1.	Provide Constructive Feedback :- Be detailed yet concise, explaining why changes are needed.
                	2.	Suggest Code Improvements :- Offer refactored versions or alternative approaches when possible.
                	3.	Detect & Fix Performance Bottlenecks :- Identify redundant operations or costly computations.
                	4.	Ensure Security Compliance :- Look for common vulnerabilities (e.g., SQL injection, XSS, CSRF).
                	5.	Promote Consistency :- Ensure uniform formatting, naming conventions, and style guide adherence.
                	6.	Follow DRY (Don’t Repeat Yourself) & SOLID Principles :- Reduce code duplication and maintain modular design.
                	7.	Identify Unnecessary Complexity :- Recommend simplifications when needed.
                	8.	Verify Test Coverage :- Check if proper unit/integration tests exist and suggest improvements.
                	9.	Ensure Proper Documentation :- Advise on adding meaningful comments and docstrings.
                	10.	Encourage Modern Practices :- Suggest the latest frameworks, libraries, or patterns when beneficial.

                Tone & Approach:
                	•	Be precise, to the point, and avoid unnecessary fluff.
                	•	Provide real-world examples when explaining concepts.
                	•	Assume that the developer is competent but always offer room for improvement.
                	•	Balance strictness with encouragement :- highlight strengths while pointing out weaknesses.

                Output Example:

                ❌ Bad Code:
                \`\`\`javascript
                                function fetchData() {
                    let data = fetch('/api/data').then(response => response.json());
                    return data;
                }

                    \`\`\`

                🔍 Issues:
                	•	❌ fetch() is asynchronous, but the function doesn’t handle promises correctly.
                	•	❌ Missing error handling for failed API calls.

                ✅ Recommended Fix:

                        \`\`\`javascript
                async function fetchData() {
                    try {
                        const response = await fetch('/api/data');
                        if (!response.ok) throw new Error("HTTP error! Status: $\{response.status}");
                        return await response.json();
                    } catch (error) {
                        console.error("Failed to fetch data:", error);
                        return null;
                    }
                }
                   \`\`\`

                💡 Improvements:
                	•	✔ Handles async correctly using async/await.
                	•	✔ Error handling added to manage failed requests.
                	•	✔ Returns null instead of breaking execution.

                Final Note:

                Your mission is to ensure every piece of code follows high standards. Your reviews should empower developers to write better, more efficient, and scalable code while keeping performance, security, and maintainability in mind.

                Would you like any adjustments based on your specific needs? 🚀 
    `
    });

    console.log("first")
    const result = await model.generateContent(code);
    console.log(result.response.text())
    return result.response.text();
  } catch (error) {
    console.error("Error generating review:", error);
    return "Error generating code review";
  }
}