"use server"
import { auth } from '@clerk/nextjs/server';
import { ConnectToDB } from 'lib/contests/connectDB/connectDB';
import Contest from 'lib/contests/models/contestSchema';


export async function createContest(formData: any) {
    try {
        const user = await auth();
        if(!user) return {success : false , error : "Invalid Authorization"}
        const title = formData.title;
        const description = formData.description;
        const startTimeStr = formData.startDate;
        const endTimeStr = formData.endDate;
        const createdBy = user.userId;
        const prizesStr = formData.prizes;

        if (!title || !description || !startTimeStr || !endTimeStr || !createdBy || !prizesStr) {
            return { success: false, error: 'Missing required fields' };
        }

        const startTime = new Date(startTimeStr);
        const endTime = new Date(endTimeStr);

        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            return { success: false, error: 'Invalid date format' };
        }

        if (startTime >= endTime) {
            return { success: false, error: 'End time must be after start time' };
        }

        if (startTime < new Date()) {
            return { success: false, error: 'Start time cannot be in the past' };
        }

        try {
            if (!Array.isArray(prizesStr)) {
                return { success: false, error: 'Prizes must be an array' };
            }
        } catch (e) {
            return { success: false, error: 'Invalid prizes format' };
        }

        await ConnectToDB()

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
            prizes : prizesStr
        };

        await Contest.create(contestData);

        // revalidatePath('/contests');
        return { success: true };
    } catch (error) {
        console.error('Failed to create contest:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to create contest'
        };
    }
}