"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { YouTubeEmbed as NextYouTubeEmbed } from "@next/third-parties/google";


type Props = {
    videoId: string;
    title?: string;
    width?: number;
    height?: number;
    autoplay?: boolean;
    showTitle?: boolean;
    className?: string;
};



function YouTubeEmbedAdapter({
    videoId,
    title = "YouTube video",
    width = 560,
    height = 315,
    autoplay = false,
    className = ""
}: Props) {

    const paramsParts: string[] = [];
    if (autoplay) {
        paramsParts.push("autoplay=1", "mute=1", "playsinline=1");
    }
    const params = paramsParts.join("&");

    return (
        <div className={`${className} m-0 p-0`} style={{ margin: 0, padding: 0 }}>
            <NextYouTubeEmbed
                videoid={videoId}
                playlabel={title}
                params={params}
                style={`aspect-ratio: ${width}/${height}; width: 100%;`}
            />
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
            // const showTitle = div.getAttribute('data-show-title') !== 'false'; // intentionally unused

            if (videoId) {
                // Create a new container for the React component
                const reactContainer = document.createElement('div');
                div.parentNode?.replaceChild(reactContainer, div);

                // Render the YouTube component
                const root = createRoot(reactContainer);
                root.render(
                    <YouTubeEmbedAdapter
                        videoId={videoId}
                        title={title}
                        autoplay={autoplay}
                    />
                );
            }
        });
    }, []);

    return <div ref={containerRef}>{children}</div>;
} 