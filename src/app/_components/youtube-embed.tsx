"use client";

import { useState } from "react";

type Props = {
    videoId: string;
    title?: string;
    width?: number;
    height?: number;
    autoplay?: boolean;
    showTitle?: boolean;
    className?: string;
};

export function YouTubeEmbed({
    videoId,
    title = "YouTube video",
    width = 560,
    height = 315,
    autoplay = false,
    className = ""
}: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Extract video ID from various YouTube URL formats
    const extractVideoId = (input: string): string => {
        // If it's already just an ID (11 characters), return it
        if (input.length === 11 && !input.includes('/')) {
            return input;
        }

        // Handle various YouTube URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match) {
                return match[1];
            }
        }

        return input; // Return as-is if no pattern matches
    };

    const cleanVideoId = extractVideoId(videoId);
    const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}${autoplay ? '?autoplay=1' : ''}`;

    const handleLoadVideo = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
    };

    if (hasError) {
        return (
            <div className={`${className}`}>
                <div className="bg-transparent rounded-lg p-8 text-center">
                    <div className="text-gray-500 dark:text-gray-400 mb-2">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">Video could not be loaded</p>
                        <p className="text-sm">Please check the video ID: {cleanVideoId}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className} m-0 p-0`} style={{ margin: 0, padding: 0 }}>
            <div className="relative w-full bg-transparent m-0 p-0" style={{ aspectRatio: `${width}/${height}`, margin: 0, padding: 0 }}>
                {!isLoaded ? (
                    // Thumbnail with play button overlay
                    <div className="relative w-full h-full bg-transparent overflow-hidden cursor-pointer group m-0 p-0" style={{ margin: 0, padding: 0 }}>
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="w-full h-full object-cover bg-transparent m-0 p-0"
                            style={{ margin: 0, padding: 0, display: 'block' }}
                            onError={handleError}
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-transparent group-hover:bg-opacity-20 transition-all duration-200" />

                        {/* Play button */}
                        <button
                            onClick={handleLoadVideo}
                            className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                            aria-label={`Play video: ${title}`}
                        >
                            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-lg">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button>

                    </div>
                ) : (
                    // Actual YouTube iframe
                    <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="bg-transparent m-0 p-0"
                        style={{ margin: 0, padding: 0, display: 'block' }}
                    />
                )}
            </div>
        </div>
    );
} 