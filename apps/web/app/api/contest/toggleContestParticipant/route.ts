import { auth } from "@clerk/nextjs/server";
import Contest from "lib/contests/models/contestSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await auth();
        if (!user.userId) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }
            );
        }

        const contestId = req.nextUrl.searchParams.get("contestId");
        const name = req.nextUrl.searchParams.get("name");

        console.log(contestId , name)
        if (!contestId) {
            return NextResponse.json(
                { message: "Contest ID is required" },
                { status: 400 }
            );
        }

        const contest = await Contest.findOne({ _id: contestId });
        if (!contest) {
            return NextResponse.json(
                { message: "Contest not found" },
                { status: 404 }
            );
        }

        const isParticipant = contest.participants.some(
            (item) => item.userId === user.userId
        );

        if (isParticipant) {
            const updatedParticipants = contest.participants.filter(
                (item) => item.userId !== user.userId
            );
            contest.participants = updatedParticipants;
            await contest.save();

            return NextResponse.json(
                { message: "Successfully removed from contest" },
                { status: 200 }
            );
        } else {
            contest.participants.push({ userId: user.userId, username: name || '', score: 0, submissionCount: 0 });
            await contest.save();

            return NextResponse.json(
                { message: "Successfully joined contest" },
                { status: 200 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}