"use client";

import { useState, useEffect, useCallback } from "react";
import { Post } from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
    posts: Post[];
    className?: string;
};

export function HeroPostsCarousel({ posts, className = "" }: Props) {
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { language } = useLanguage();

    // Embla carousel setup with autoplay
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            duration: 30, // 3 seconds transition (30 * 100ms)
            dragFree: false,
            containScroll: "trimSnaps"
        },
        [
            Autoplay({
                delay: 7000, // 7 seconds between transitions
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                stopOnFocusIn: false
            })
        ]
    );

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Generate the image carousel sequence
    const generateImageSequence = () => {
        const sequence: { image: string; post: Post }[] = [];
        
        // Sort posts by date (most recent first)
        const sortedPosts = [...posts].sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        
        // Use mobileCoverImages for mobile if available, otherwise fallback to coverImages
        const getImagesForPost = (post: Post) => {
            if (isMobile && post.mobileCoverImages && post.mobileCoverImages.length > 0) {
                return post.mobileCoverImages;
            }
            return post.coverImages;
        };

        const maxImages = Math.max(...sortedPosts.map(post => getImagesForPost(post).length));

        for (let i = 0; i < maxImages; i++) {
            sortedPosts.forEach(post => {
                const images = getImagesForPost(post);
                const imageIndex = i % images.length;
                sequence.push({
                    image: images[imageIndex],
                    post
                });
            });
        }

        return sequence;
    };

    const imageSequence = generateImageSequence();

    // Navigation callbacks
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Reset carousel when mobile state changes
    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
        }
    }, [emblaApi, isMobile]);

    const handleClick = () => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 300); // Reset after animation
    };

    if (posts.length === 0) return null;

    return (
        <div className={`relative -mx-[calc(50vw-50%)] w-screen ${className}`}>
            {/* Main carousel container */}
            <div className="relative overflow-hidden bg-transparent">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container flex">
                        {imageSequence.map(({ image, post }, index) => (
                            <div key={`${post.slug}-${index}`} className="embla__slide flex-[0_0_100%] min-w-0">
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
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollPrev();
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
                        scrollNext();
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