import { getAllPosts } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const language = searchParams.get("language") as "en" | "zh" | null;

    if (!query || query.trim() === "") {
        return NextResponse.json([]);
    }

    try {
        const allPosts = getAllPosts(language || undefined);
        const searchQuery = query.toLowerCase().trim();

        const filteredPosts = allPosts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(searchQuery);
            const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
            const contentMatch = post.content.toLowerCase().includes(searchQuery);

            return titleMatch || excerptMatch || contentMatch;
        });

        // Return only essential fields for search results
        const searchResults = filteredPosts.map(post => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            coverImage: post.coverImage,
            author: post.author,
            language: post.language
        }));

        return NextResponse.json(searchResults);
    } catch (error) {
        console.error("Error searching posts:", error);
        return NextResponse.json({ error: "Failed to search posts" }, { status: 500 });
    }
} 