import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ConnectToDB } from 'lib/contests/connectDB/connectDB';
import Contest from 'lib/contests/models/contestSchema';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const user = await auth();
        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid Authorization" },
                { status: 401 }
            );
        }

        const userId = user.userId;
        const body = await request.json();
        const { contestId , name } = body;

        if (!contestId) {
            return NextResponse.json(
                { success: false, error: "Contest ID is required" },
                { status: 400 }
            );
        }

        await ConnectToDB();

        const contest = await Contest.findById(contestId);
        if (!contest) {
            return NextResponse.json(
                { success: false, error: "Contest not found" },
                { status: 404 }
            );
        }

        // console.log(contest)

        if (contest.participants.length > 0) {
          const existingParticipation = await Contest.findOne({
            _id: contestId,
            "participants.userId": String(userId),
          });

          console.log(existingParticipation);
          
          if (existingParticipation) {
            return NextResponse.json(
              { success: false, error: "Already joined the contest" },
              { status: 400 }
            );
          }
        }

        // console.log(contestId,"harsh")

        const participation = await Contest.findByIdAndUpdate(
            contestId,
            { $push: { participants: { userId, username: name || "Unknown", score: 0, submissionCount: 0 } } }, 
            { new: true }
        );
        

        return NextResponse.json(
            { success: true, data: participation },
            { status: 200 }
        );

    } catch (error) {
        console.error('[CONTEST_JOIN_ERROR]:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to join contest' 
            },
            { status: 500 }
        );
    }
}
