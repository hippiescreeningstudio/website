"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";



type Props = {
    videoId: string;
    title?: string;
    width?: number;
    height?: number;
    autoplay?: boolean;
    showTitle?: boolean;
    className?: string;
};

function YouTubeEmbed({
    videoId,
    title = "YouTube video",
    width = 560,
    height = 315,
    autoplay = false,
    className = ""
}: Props) {

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
    const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}${autoplay ? '?autoplay=1' : ''}`;

    return (
        <div className={`${className} m-0 p-0`} style={{ margin: 0, padding: 0 }}>
            <div className="relative w-full bg-transparent m-0 p-0" style={{ aspectRatio: `${width}/${height}`, margin: 0, padding: 0 }}>
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
            </div>
        </div>
    );
} 

export function YouTubeProcessor({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Find all YouTube placeholder divs
        const youtubeDivs = containerRef.current.querySelectorAll('.youtube-embed');

        youtubeDivs.forEach((div) => {
            const videoId = div.getAttribute('data-video-id');
            const title = div.getAttribute('data-title') || undefined;
            const autoplay = div.getAttribute('data-autoplay') === 'true';
            const showTitle = div.getAttribute('data-show-title') !== 'false';

            if (videoId) {
                // Create a new container for the React component
                const reactContainer = document.createElement('div');
                div.parentNode?.replaceChild(reactContainer, div);

                // Render the YouTube component
                const root = createRoot(reactContainer);
                root.render(
                    <YouTubeEmbed
                        videoId={videoId}
                        title={title}
                        autoplay={autoplay}
                        showTitle={showTitle}
                    />
                );
            }
        });
    }, []);

    return <div ref={containerRef}>{children}</div>;
} 