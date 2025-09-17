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

export function PastScreeningsGrid({ posts, className = "" }: Props) {
    const { language } = useLanguage();
    const [clickedPost, setClickedPost] = useState<string | null>(null);

    if (posts.length === 0) return null;

    const handleClick = (slug: string) => {
        setClickedPost(slug);
        setTimeout(() => setClickedPost(null), 300); // Reset after animation
    };

    return (
        <div className={className}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-items-center">
                {posts.map((post) => {
                    const mainImage = post.ogImage.url;

                    return (
                        <div key={post.slug} className="group flex flex-col items-center">
                            <Link
                                href={language === "zh" ? `/zh/films/${post.slug}` : `/films/${post.slug}`}
                                className="block overflow-hidden aspect-[3/4] max-h-72 md:max-h-96"
                                onClick={() => handleClick(post.slug)}
                            >
                                <Image
                                    src={mainImage}
                                    alt={post.title}
                                    width={300}
                                    height={400}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                            {post.overlayText && (
                                <div className="mt-3 text-center">
                                    <p className="text-white text-sm md:text-base relative inline-block">
                                        {post.overlayText.title}
                                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${clickedPost === post.slug ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 