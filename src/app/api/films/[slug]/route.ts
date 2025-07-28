import { getPostBySlug } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language") as "en" | "zh" | null;

    try {
        const post = getPostBySlug(slug, language || undefined);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
} 