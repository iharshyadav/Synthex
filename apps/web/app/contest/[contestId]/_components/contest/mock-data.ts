
// Mock test cases
const mockTestCases = [
  {
    input: "1 2 3 4 5 null 6",
    output: "In-order: 4 2 5 1 3 6\nPre-order: 1 2 4 5 3 6\nPost-order: 4 5 2 6 3 1",
    public: true,
  },
  {
    input: "[2, 4, 6, 2, 5]",
    output: "13 (2 + 6 + 5)",
    public: true,
  },
]

// Mock problems with the new IProblem structure
const mockProblems = [
  {
    problemId: "problem-1",
    title: "Binary Tree Traversal",
    description: "Implement three different traversal methods for a binary tree: in-order, pre-order, and post-order.",
    testCases: mockTestCases,
    image: [],
    difficulty: "Medium",
    points: 100,
    timeLimit: 2000, // milliseconds
    memoryLimit: 256, // MB
  },
  {
    problemId: "problem-2",
    title: "Dynamic Programming Challenge",
    description: "Find the maximum sum of non-adjacent elements in an array.",
    testCases: mockTestCases,
    image: [],
    difficulty: "Hard",
    points: 200,
    timeLimit: 1000,
    memoryLimit: 128,
  },
  {
    problemId: "problem-3",
    title: "Graph Connectivity",
    description: "Determine if there is a path between two nodes in an undirected graph.",
    testCases: mockTestCases,
    image: [],
    difficulty: "Medium",
    points: 150,
    timeLimit: 1500,
    memoryLimit: 256,
  },
  {
    problemId: "problem-4",
    title: "String Manipulation",
    description: "Find the longest palindromic substring in a given string.",
    testCases: mockTestCases,
    image: [],
    difficulty: "Easy",
    points: 50,
    timeLimit: 1000,
    memoryLimit: 128,
  },
  {
    problemId: "problem-5",
    title: "Advanced Recursion",
    description: "Solve the N-Queens problem using backtracking.",
    testCases: mockTestCases,
    image: [],
    difficulty: "Hard",
    points: 250,
    timeLimit: 3000,
    memoryLimit: 512,
  },
]

// Mock participants with the new IParticipant structure
const mockParticipants= Array.from({ length: 68 }).map((_, i) => ({
  userId: `user-${i + 1}`,
  username: `User ${i + 1}`,
  score: Math.floor(Math.random() * 1000),
  submissionCount: Math.floor(Math.random() * 20),
  registrationDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
}))

// Mock leaderboard with the new ILeaderboard structure
const mockLeaderboard = mockParticipants.slice(0, 10).map((participant, index) => ({
  userId: participant.userId,
  username: participant.username,
  score: participant.score,
  rank: index + 1,
  lastSubmissionTime: new Date(Date.now() - Math.random() * 3600000),
}))

// Mock contest data with the extended Contest type
export const MOCK_CONTEST = {
  _id: "1",
  title: "Advanced Algorithm Challenge",
  description:
    "Solve complex algorithmic problems in limited time. This contest will test your knowledge of data structures, algorithms, and problem-solving skills under time pressure.",
  startTime: new Date("2025-04-15T10:00:00"),
  endTime: new Date("2025-04-15T14:00:00"),
  problems: mockProblems,
  participants: mockParticipants,
  leaderboard: mockLeaderboard,
  createdBy: "admin123",
  isActive: true,
  prizes: [
    { position: 1, reward: "$500" },
    { position: 2, reward: "$250" },
    { position: 3, reward: "$100" },
  ],

  // UI-specific properties
  status: "upcoming",
  type: "knockout",
  participantLimit: 100,
  currentParticipants: 68,
  entryFee: 0,
  categories: ["Algorithms", "Data Structures"],
  organizer: {
    name: "CodeArena Team",
    avatar: "https://github.com/shadcn.png",
  },
  rules: [
    "All submissions must be original work",
    "Time limit: 4 hours",
    "Internet access is allowed for documentation only",
    "No collaboration with other participants",
    "Solutions must pass all test cases to be considered valid",
  ],
  materials: [
    { name: "Contest Guidelines.pdf", size: "1.2 MB" },
    { name: "Sample Problems.zip", size: "3.5 MB" },
  ],
  waitlist: Array.from({ length: 5 }).map((_, i) => ({
    id: `waitlist-${i + 1}`,
    name: `Waitlist User ${i + 1}`,
    avatar: "https://github.com/shadcn.png",
    registrationDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
  })),
  updates: [
    {
      id: "update-1",
      title: "Contest Time Updated",
      content: "The contest start time has been moved from 9:00 AM to 10:00 AM.",
      date: new Date("2025-04-01T12:00:00"),
    },
    {
      id: "update-2",
      title: "New Practice Problems Added",
      content: "We've added new practice problems to help you prepare for the contest.",
      date: new Date("2025-04-05T15:30:00"),
    },
  ],
  isFavorite: false,
  isRegistered: false,
}

