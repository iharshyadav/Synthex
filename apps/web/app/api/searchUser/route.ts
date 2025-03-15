import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("id");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch user" }, { status: response.status });
        }

        const user = await response.json();
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
