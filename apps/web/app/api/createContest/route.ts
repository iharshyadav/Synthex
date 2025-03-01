import { auth } from '@clerk/nextjs/server';
import { ConnectToDB } from 'lib/contests/connectDB/connectDB';
import Contest from 'lib/contests/models/contestSchema';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    try {
        const user = await auth();
        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid Authorization" }, { status: 401 });
        }

        const formData = await request.json();
        const { title, description, startDate: startTimeStr, endDate: endTimeStr, prizes: prizesStr } = formData;
        const createdBy = user.userId;

        if (!title || !description || !startTimeStr || !endTimeStr || !createdBy || !prizesStr) {
            console.log(title,description,startTimeStr,endTimeStr,createdBy,prizesStr)
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const startTime = new Date(startTimeStr);
        const endTime = new Date(endTimeStr);

        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            return NextResponse.json({ success: false, error: 'Invalid date format' }, { status: 400 });
        }

        if (startTime >= endTime) {
            return NextResponse.json({ success: false, error: 'End time must be after start time' }, { status: 400 });
        }

        if (startTime < new Date()) {
            return NextResponse.json({ success: false, error: 'Start time cannot be in the past' }, { status: 400 });
        }

        if (!Array.isArray(prizesStr)) {
            return NextResponse.json({ success: false, error: 'Prizes must be an array' }, { status: 400 });
        }

        await ConnectToDB();

        const contestData = {
            title: title.trim(),
            description: description.trim(),
            startTime,
            endTime,
            problems: [],
            participants: [],
            leaderboard: [],
            createdBy,
            isActive: true,
            prizes: prizesStr
        };

        await Contest.create(contestData);

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to create contest:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to create contest' 
        }, { status: 500 });
    }
}