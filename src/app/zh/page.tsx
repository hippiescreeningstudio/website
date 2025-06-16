"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { HeroPostsCarousel } from "@/app/_components/hero-posts-carousel";
import { PostGrid } from "@/app/_components/post-grid";
import { Footer } from "@/app/_components/footer";
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

    // Filter posts into hero and regular posts
    const heroPosts = posts.filter(post => post.isHero);
    const regularPosts = posts.filter(post => !post.isHero);

    return (
        <main>
            <Container>
                <Intro />
                {/* Hero Posts Carousel */}
                {heroPosts.length > 0 && (
                    <div className="mb-16">
                        <HeroPostsCarousel posts={heroPosts} />
                    </div>
                )}
                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                    <div className="mb-16">
                        <PostGrid posts={regularPosts} />
                    </div>
                )}
            </Container>
            <Footer />
        </main>
    );
} 