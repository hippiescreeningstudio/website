import { isPostBilingual } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    try {
        const languageInfo = isPostBilingual(slug);
        return NextResponse.json(languageInfo);
    } catch (error) {
        console.error("Error checking post languages:", error);
        return NextResponse.json({ error: "Failed to check post languages" }, { status: 500 });
    }
} 