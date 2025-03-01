import mongoose, { Document, Model } from "mongoose";

interface ITestCase {
    input: string;
    output: string;
    public: boolean;
}

interface IProblem {
    problemId: mongoose.Types.ObjectId;
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

interface IContest extends Document {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    problems: IProblem[];
    participants: IParticipant[];
    leaderboard: ILeaderboard[];
    createdBy: string;
    isActive: boolean;
    prizes: { position: number; reward: string; }[];
}

const testCaseSchema = new mongoose.Schema<ITestCase>({
    input: { type: String, required: true },
    output: { type: String, required: true },
    public: { type: Boolean, default: false },
});

const problemSchema = new mongoose.Schema<IProblem>({
    problemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    testCases: [testCaseSchema],
    image: [{ type: String }],
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    points: { type: Number, required: true },
    timeLimit: { type: Number, default: 2 },
    memoryLimit: { type: Number, default: 256 },
});

const participantSchema = new mongoose.Schema<IParticipant>({
    userId: { type: String, required: true},
    username: { type: String, required: true },
    score: { type: Number, default: 0 },
    submissionCount: { type: Number, default: 0 },
});

const leaderboardSchema = new mongoose.Schema<ILeaderboard>({
    userId: { type: String, required: true},
    username: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number },
    lastSubmissionTime: { type: Date },
});

const contestSchema = new mongoose.Schema<IContest>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    problems: [problemSchema],
    participants: [participantSchema],
    leaderboard: [leaderboardSchema],
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    prizes: [{
        position: { type: Number, required: true },
        reward: { type: String, required: true }
    }]
});

const Contest: Model<IContest> = mongoose.models?.Contests || mongoose.model<IContest>("Contests", contestSchema);
export default Contest;
