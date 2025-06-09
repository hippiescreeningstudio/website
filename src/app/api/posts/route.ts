import { getAllPosts } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language") as "en" | "zh" | null;

    try {
        const posts = getAllPosts(language || undefined);
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
} 