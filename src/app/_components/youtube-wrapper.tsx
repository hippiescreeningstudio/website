"use client";

import { YouTubeEmbed } from "./youtube-embed";

type Props = {
    "data-video-id": string;
    "data-title"?: string;
    "data-autoplay"?: string;
    "data-show-title"?: string;
    className?: string;
};

export function YouTubeWrapper({
    "data-video-id": videoId,
    "data-title": title,
    "data-autoplay": autoplay,
    "data-show-title": showTitle,
    className = ""
}: Props) {
    return (
        <YouTubeEmbed
            videoId={videoId}
            title={title}
            autoplay={autoplay === "true"}
            showTitle={showTitle !== "false"}
            className={className}
        />
    );
} 