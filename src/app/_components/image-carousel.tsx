"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CarouselImage = {
    src: string;
    alt: string;
    caption?: string;
};

type Props = {
    images: CarouselImage[];
    autoplayInterval?: number; // in milliseconds, default 4000ms
    className?: string;
};

export function ImageCarousel({
    images,
    autoplayInterval = 4000,
    className = ""
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance carousel
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [images.length, autoplayInterval]);

    // Handle manual navigation
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    if (images.length === 0) return null;

    // Single image - no carousel needed
    if (images.length === 1) {
        return (
            <figure className={`relative ${className}`}>
                <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    width={1200}
                    height={600}
                    className="max-w-full h-auto mx-auto block rounded-lg"
                />
            </figure>
        );
    }

    return (
        <figure className={`relative ${className}`}>
            {/* Main carousel container */}
            <div className="relative overflow-hidden rounded-lg bg-transparent">
                {/* Images container */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={1200}
                                height={600}
                                className="w-full h-auto object-cover"
                                priority={index === 0}
                            />
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

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            goToSlide(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                            ? 'bg-white opacity-100'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>


        </figure>
    );
} 