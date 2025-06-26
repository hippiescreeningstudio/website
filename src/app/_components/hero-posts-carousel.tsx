"use client";

import { useState, useEffect } from "react";
import { Post } from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

type Props = {
    posts: Post[];
    className?: string;
};

export function HeroPostsCarousel({ posts, className = "" }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClicking, setIsClicking] = useState(false);
    const { language } = useLanguage();

    // Generate the image carousel sequence
    const generateImageSequence = () => {
        const sequence: { image: string; post: Post }[] = [];
        const maxImages = Math.max(...posts.map(post => post.coverImages.length));

        for (let i = 0; i < maxImages; i++) {
            posts.forEach(post => {
                const imageIndex = i % post.coverImages.length;
                sequence.push({
                    image: post.coverImages[imageIndex],
                    post
                });
            });
        }

        return sequence;
    };

    const imageSequence = generateImageSequence();

    // Auto-advance carousel
    useEffect(() => {
        if (imageSequence.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === imageSequence.length - 1 ? 0 : prevIndex + 1
            );
        }, 7000);

        return () => clearInterval(interval);
    }, [imageSequence.length]);

    // Handle manual navigation
    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? imageSequence.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === imageSequence.length - 1 ? 0 : currentIndex + 1);
    };

    const handleClick = () => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 300); // Reset after animation
    };

    if (posts.length === 0) return null;

    return (
        <div className={`relative -mx-[calc(50vw-50%)] w-screen ${className}`}>
            {/* Main carousel container */}
            <div className="relative overflow-hidden bg-transparent">
                {/* Images container */}
                <div
                    className="flex transition-transform ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transitionDuration: '3000ms'
                    }}
                >
                    {imageSequence.map(({ image, post }, index) => (
                        <div key={`${post.slug}-${index}`} className="w-full flex-shrink-0">
                            <Link
                                href={language === "zh" ? `/zh/posts/${post.slug}` : `/posts/${post.slug}`}
                                onClick={handleClick}
                                onTouchStart={handleClick}
                            >
                                <div className="relative">
                                    <Image
                                        src={image}
                                        alt={post.title}
                                        width={1920}
                                        height={1080}
                                        className="w-full h-[100vh] object-cover"
                                    />
                                    {post.overlayText && (
                                        <div className="absolute bottom-12 left-0 right-0">
                                            <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="space-y-1">
                                                    <p className="text-white text-2xl md:text-4xl font-bold relative inline-block group">
                                                        {post.overlayText.title}
                                                        <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${isClicking ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
                                                    </p>
                                                    <p className="text-white text-xl md:text-2xl">
                                                        {post.overlayText.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToPrevious();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-80 hover:opacity-100"
                    aria-label="Previous image"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToNext();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-80 hover:opacity-100"
                    aria-label="Next image"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
} 