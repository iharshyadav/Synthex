import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ConnectToDB } from 'lib/contests/connectDB/connectDB';
import Contest from 'lib/contests/models/contestSchema';

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const user = await auth();
        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid Authorization" },
                { status: 401 }
            );
        }

        const userId = user.userId;
        
        await ConnectToDB();

        const contests = await Contest.find({})
            .sort({ createdAt: -1 });

            console.log(contests)

        return NextResponse.json({ success: true, data: contests }, { status: 200 });

    } catch (error) {
        console.error('Error fetching contests:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to fetch contests' 
            },
            { status: 500 }
        );
    }
}
