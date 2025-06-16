"use client";

import { Post } from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

type Props = {
    posts: Post[];
    className?: string;
};

export function PostGrid({ posts, className = "" }: Props) {
    const { language } = useLanguage();

    if (posts.length === 0) return null;

    return (
        <div className={className}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center mt-30">
                {language === "en" ? "Previous Screenings ↓" : "过往放映 ↓"}
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
                        >
                            <Image
                                src={mainImage}
                                alt={post.title}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover md:object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            {post.overlayText && (
                                <div className="absolute bottom-8 left-0 right-0 p-4">
                                    <div className="space-y-1">
                                        <p className="text-white text-xl md:text-2xl font-bold">
                                            {post.overlayText[language].title}
                                        </p>
                                        <p className="text-white text-sm md:text-base">
                                            {post.overlayText[language].subtitle}
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