'use server';

type SubmissionRequest = {
    source_code: string;
    language_id: number;
    stdin?: string;
    expected_output?: string;
    cpu_time_limit?: number;
    memory_limit?: number;
};

type SubmissionResponse = {
    token: string;
    status?: {
        id: number;
        description: string;
    };
    stdout?: string;
    stderr?: string;
    compile_output?: string;
    time?: string;
    memory?: number;
};

export async function submitContestCode(
    code: string,
    languageId: number,
    testCases: { input: string; expected_output: string; hidden?: boolean }[],
    contestId?: string,
    problemId?: string
): Promise<SubmissionResponse> {
    const JUDGE0_API_URL = process.env.JUDGE0_API_URL as string;
    
    if (!code || code.trim() === '') {
        throw new Error("Source code cannot be blank");
    }
    
    if (!languageId) {
        throw new Error("Language ID cannot be blank");
    }
    
    const submissions : SubmissionRequest[] = testCases.map(testCase => ({
        source_code: Buffer.from(code).toString('base64'),
        language_id: languageId,
        stdin: testCase.input ? Buffer.from(testCase.input).toString('base64') : undefined,
        expected_output: testCase.expected_output ? Buffer.from(testCase.expected_output).toString('base64') : undefined,
        cpu_time_limit: 5,
        memory_limit: 128000
    }));

    try {
        const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions/batch?base64_encoded=true&wait=false&fields=*`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.JUDGE0_API_KEY as string,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
            body: JSON.stringify({ submissions }),
        });

        if (!submitResponse.ok) {
            const errorText = await submitResponse.text();
            throw new Error(`Submission failed: ${submitResponse.status} ${submitResponse.statusText} - ${errorText}`);
        }

        const response = await submitResponse.json();
        // console.log(response)

        const tokens = response.map((submission: { token: string }) => submission.token);

        // if (contestId && problemId) {
        //     try {
        //         await saveContestProblemResponse({
        //             contestId,
        //             problemId,
        //             code,
        //             token: tokens,
        //             status: 'PROCESSING',
        //             language: String(languageId),
        //             executionTime : 123,
        //             memory : 128000
        //         });
        //     } catch (dbError) {
        //         console.error('Error saving submission to database:', dbError);
        //     }
        // }
        
        
        // Handling batch submission response
        // if (response.submissions && response.submissions.length > 0) {
        //     const token = response.submissions[0].token;
            
        //     // Get submission result
        //     const result = await getSubmissionResult(token);
            
        //     // Revalidate path to update UI
        //     if (contestId && problemId) {
        //         revalidatePath(`/contest/${contestId}/${problemId}`);
        //     }
            
        //     return result;
        // } else {
        //     throw new Error('No submission tokens returned');
        // }
        return tokens;
    } catch (error) {
        console.error('Error submitting code:', error);
        throw error;
    }
}

async function getSubmissionResult(token: string): Promise<SubmissionResponse> {
    const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
    
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
        if (attempts > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(1.5, attempts)));
        }
        
        const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true&fields=*`, {
            headers: {
                'X-RapidAPI-Key': process.env.JUDGE0_API_KEY as string,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
        });

        if (!resultResponse.ok) {
            attempts++;
            continue;
        }

        const result = await resultResponse.json();
        
        if (result.status?.id <= 2) {
            attempts++;
            continue;
        }
        
        return result;
    }
    
    throw new Error('Submission processing timeout');
}