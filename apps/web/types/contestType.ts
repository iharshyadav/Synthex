interface ITestCase {
    input: string;
    output: string;
    public: boolean;
}

interface IProblem {
    problemId: string;
    title: string;
    description: string;
    testCases: ITestCase[];
    image: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    points: number;
    timeLimit: number;
    memoryLimit: number;
}

interface IParticipant {
    userId: string;
    username: string;
    score: number;
    submissionCount: number;
}

interface ILeaderboard {
    userId: string;
    username: string;
    score: number;
    rank?: number;
    lastSubmissionTime?: Date;
}

interface IContest { 
    _id?: string;  
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    problems: IProblem[];
    participants: IParticipant[];
    leaderboard: ILeaderboard[];
    createdBy: string;
    isActive: boolean;
    prizes: {
        position: number;
        reward: string;
    }[];
}

export type {
    ITestCase,
    IProblem,
    IParticipant,
    ILeaderboard,
    IContest
};
