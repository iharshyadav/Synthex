 export const runLiveCode = async (language: string, code: string) => {
            if (!code) {
                return{ error: "Please enter some code" };
            }
      
            // set({ isRunning: true, error: null, output: "" });
      
            try {
              const languageConfig = "javascript";
              if (!languageConfig) {
                return{ error: "Unsupported language" };
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
                return{ error: data.message, executionResult: { code, output: "", error: data.message } };
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
                const filteredError = error.split("\n").map((line: string, index: number) => {
                  if (line.includes("/piston/jobs/")) {
                    return `Line ${index + 1}: ${line.split("/piston/jobs/")[1]}`;
                  }
                  return line;
                }).join("\n");
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

              console.log(output)
      
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
          }