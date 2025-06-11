"use client";

import { ImageCarousel } from "./image-carousel";

type Props = {
    images: string; // JSON string of image data
    autoplayInterval?: number;
    className?: string;
};

export function CarouselWrapper({
    images,
    autoplayInterval = 4000,
    className = ""
}: Props) {
    try {
        const imageData = JSON.parse(images);
        return (
            <ImageCarousel
                images={imageData}
                autoplayInterval={autoplayInterval}
                className={className}
            />
        );
    } catch (error) {
        console.error("Error parsing carousel images:", error);
        return <div>Error loading carousel images</div>;
    }
} 