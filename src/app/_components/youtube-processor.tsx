"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { YouTubeEmbed } from "./youtube-embed";

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