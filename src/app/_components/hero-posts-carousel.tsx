"use client";

import { useState, useEffect, useRef } from "react";
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
    const { language } = useLanguage();
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

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
        }, 4000);

        return () => clearInterval(interval);
    }, [imageSequence.length]);

    // Handle manual navigation
    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? imageSequence.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === imageSequence.length - 1 ? 0 : currentIndex + 1);
    };

    // Touch event handlers for swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (posts.length === 0) return null;

    return (
        <div className={`relative -mx-5 md:-mx-8 lg:-mx-12 ${className}`}>
            {/* Main carousel container */}
            <div
                className="relative overflow-hidden bg-transparent"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Images container */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {imageSequence.map(({ image, post }, index) => (
                        <div key={`${post.slug}-${index}`} className="w-full flex-shrink-0">
                            <Link href={language === "zh" ? `/zh/posts/${post.slug}` : `/posts/${post.slug}`}>
                                <div className="relative">
                                    <Image
                                        src={image}
                                        alt={post.title}
                                        width={1920}
                                        height={1080}
                                        className="w-full h-[70vh] md:h-[80vh] object-cover hover:opacity-90 transition-opacity duration-200"
                                    />
                                    {post.overlayText && (
                                        <div className="absolute bottom-8 left-0 right-0">
                                            <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="space-y-1">
                                                    <p className="text-white text-2xl md:text-3xl font-bold">
                                                        {post.overlayText.title}
                                                    </p>
                                                    <p className="text-white text-base md:text-lg">
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