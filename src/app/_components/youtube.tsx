"use client";

import { YouTubeEmbed as NextYouTubeEmbed } from "@next/third-parties/google";

type Props = {
    videoId: string;
    title?: string;
    width?: number;
    height?: number;
    className?: string;
};

// Must be rendered inside the Next.js tree: the embed relies on next/script to
// load lite-youtube, which is a no-op outside it.
export function YouTubeEmbed({
    videoId,
    title = "YouTube video",
    width = 560,
    height = 315,
    className = ""
}: Props) {
    return (
        <div className={`${className} m-0 p-0`} style={{ margin: 0, padding: 0 }}>
            <NextYouTubeEmbed
                videoid={videoId}
                playlabel={title}
                style={`aspect-ratio: ${width}/${height}; width: 100%;`}
            />
        </div>
    );
}
