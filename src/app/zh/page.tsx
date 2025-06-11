"use client";

import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

export default function ChineseIndex() {
    const { setLanguage } = useLanguage();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/posts?language=zh`);
                if (response.ok) {
                    const fetchedPosts = await response.json();
                    setPosts(fetchedPosts);
                } else {
                    console.error("Failed to fetch posts");
                    setPosts([]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <main>
                <Container>
                    <Intro />
                    <div className="text-center py-8">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            加载中...
                        </p>
                    </div>
                </Container>
            </main>
        );
    }

    if (posts.length === 0) {
        return (
            <main>
                <Container>
                    <Intro />
                    <div className="text-center py-8">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            暂无文章
                        </p>
                    </div>
                </Container>
            </main>
        );
    }

    const heroPost = posts[0];
    const morePosts = posts.slice(1);

    return (
        <main>
            <Container>
                <Intro />
                <HeroPost
                    title={heroPost.title}
                    coverImages={heroPost.coverImages}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                />
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </main>
    );
} 