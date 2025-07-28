"use client";

import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Notification } from "@/app/_components/notification";
import { Sticker } from "@/app/_components/sticker";
import { PostProvider } from "@/contexts/post-context";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";
import { Footer } from "@/app/_components/footer";

type Params = {
    params: Promise<{
        slug: string;
    }>;
};

export default function ChinesePostPage(props: Params) {
    const { setLanguage } = useLanguage();
    const [post, setPost] = useState<Post | null>(null);
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string>("");
    const [notFoundError, setNotFoundError] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        isVisible: boolean;
    }>({ message: "", isVisible: false });
    const [bilingualInfo, setBilingualInfo] = useState<{
        hasEn: boolean;
        hasZh: boolean;
    }>({ hasEn: false, hasZh: false });
    const [showSticker, setShowSticker] = useState(false);

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    // Track scroll position to show sticker after header (desktop only)
    useEffect(() => {
        const handleScroll = () => {
            // Check if we're on desktop (medium screens and up)
            const isDesktop = window.innerWidth >= 768; // md breakpoint
            
            if (!isDesktop) {
                // Always show sticker on mobile
                setShowSticker(true);
                return;
            }

            // Desktop behavior: show after scrolling past header
            const article = document.querySelector('article');
            if (article) {
                const articleTop = article.offsetTop;
                const headerHeight = 200; // Approximate height of the header section
                const scrollPosition = window.scrollY;
                
                // Show sticker when user scrolls past the header
                setShowSticker(scrollPosition > articleTop + headerHeight);
            }
        };

        // Handle window resize to check screen size
        const handleResize = () => {
            handleScroll();
        };

        // Add listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Check initial position
        handleScroll();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [post]); // Depend on post so it recalculates when post loads

    useEffect(() => {
        const getParams = async () => {
            const params = await props.params;
            setSlug(params.slug);
        };
        getParams();
    }, [props.params]);

    // Check if post is bilingual
    useEffect(() => {
        if (!slug) return;

        const checkBilingual = async () => {
            try {
                const response = await fetch(`/api/films/${slug}/bilingual`);
                if (response.ok) {
                    const info = await response.json();
                    setBilingualInfo(info);
                }
            } catch (error) {
                console.error("Error checking bilingual status:", error);
            }
        };

        checkBilingual();
    }, [slug]);

    useEffect(() => {
        if (!slug) return;

        const loadPost = async () => {
            setLoading(true);
            setNotFoundError(false);

            try {
                const response = await fetch(`/api/films/${slug}?language=zh`);

                if (response.status === 404) {
                    setNotFoundError(true);
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch post");
                }

                const foundPost = await response.json();
                const htmlContent = await markdownToHtml(foundPost.content || "");
                setPost(foundPost);
                setContent(htmlContent);
            } catch (error) {
                console.error("Error loading post:", error);
                setNotFoundError(true);
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [slug]);

    const handleLanguageUnavailable = (message: string) => {
        setNotification({ message, isVisible: true });
    };

    const closeNotification = () => {
        setNotification({ message: "", isVisible: false });
    };

    if (loading) {
        return (
            <main>
                <Container>
                    <PostProvider
                        slug={slug}
                        backgroundColor={post?.backgroundColor}
                        bilingualInfo={bilingualInfo}
                        onLanguageUnavailable={handleLanguageUnavailable}
                    >
                        <Intro />
                    </PostProvider>
                    <div className="text-center py-8">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            加载中...
                        </p>
                    </div>
                </Container>
            </main>
        );
    }

    if (notFoundError || !post) {
        return notFound();
    }

    return (
        <div style={{ backgroundColor: post.backgroundColor || undefined, minHeight: '100vh' }}>
            <PostProvider
                slug={slug}
                backgroundColor={post.backgroundColor}
                bilingualInfo={bilingualInfo}
                onLanguageUnavailable={handleLanguageUnavailable}
            >
                <Container>
                    <Intro />
                    <article className="mb-32 pt-16">
                        <PostHeader
                            title={post.title}
                            coverImages={post.coverImages}
                            date={post.date}
                            author={post.author}
                        />
                        <PostBody content={content} />
                    </article>
                </Container>
                <Footer />
            </PostProvider>
            {post.sticker && showSticker && (
                <Sticker 
                    text={post.sticker.text} 
                    color={post.sticker.color} 
                    textColor={post.sticker.textColor}
                    link={post.sticker.link}
                />
            )}
            <Notification
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={closeNotification}
            />
        </div>
    );
} 