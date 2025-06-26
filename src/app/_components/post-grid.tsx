"use client";

import { Post } from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";

type Props = {
    posts: Post[];
    className?: string;
};

export function PostGrid({ posts, className = "" }: Props) {
    const { language } = useLanguage();
    const [clickedPost, setClickedPost] = useState<string | null>(null);

    if (posts.length === 0) return null;

    const handleClick = (slug: string) => {
        setClickedPost(slug);
        setTimeout(() => setClickedPost(null), 300); // Reset after animation
    };

    return (
        <div className={className}>
            <h2 className="text-2xl font-bold mb-4">
        {language === "en" ? "Previous Screenings" : "过往放映"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {posts.map((post) => {
                    const images = typeof window !== 'undefined' && window.innerWidth < 768
                        ? post.mobileCoverImages || post.coverImages
                        : post.coverImages;
                    const mainImage = images[0];

                    return (
                        <Link
                            key={post.slug}
                            href={language === "zh" ? `/zh/posts/${post.slug}` : `/posts/${post.slug}`}
                            className="group relative block aspect-[16/9] overflow-hidden"
                            onClick={() => handleClick(post.slug)}
                        >
                            <Image
                                src={mainImage}
                                alt={post.title}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover md:object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            {post.overlayText && (
                                <div className="absolute bottom-2 left-5 right-0 p-1">
                                    <div className="space-y-1">
                                        <p className="text-white text-base md:text-2xl relative inline-block group">
                                            {post.overlayText.title}
                                            <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${clickedPost === post.slug ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
} 