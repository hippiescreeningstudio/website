"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Embla carousel setup with autoplay
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            duration: 20, // 500ms transition (20 * 25ms)
            dragFree: false,
            containScroll: "trimSnaps"
        },
        images.length > 1 ? [
            Autoplay({
                delay: autoplayInterval,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                stopOnFocusIn: true
            })
        ] : []
    );

    // Update selected index when slide changes
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Navigation callbacks
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

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
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container flex">
                        {images.map((image, index) => (
                            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
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

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollTo(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === selectedIndex
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