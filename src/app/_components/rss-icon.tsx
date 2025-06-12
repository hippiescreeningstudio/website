"use client";

export function RSSIcon() {
    const handleClick = () => {
        const rssUrl = `${window.location.origin}/rss.xml`;
        window.open(rssUrl, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="text-white hover:scale-110 transition-all duration-300 p-1"
            aria-label="Subscribe to RSS feed"
            title="Subscribe to RSS feed"
        >
            <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M3.429 2.571v2.286q5.714 0 9.857 4.143t4.143 9.857h2.286q0-7.714-5.5-13.214t-13.214-5.5zM3.429 7.143v2.286q2.571 0 4.429 1.857t1.857 4.429h2.286q0-4-2.857-6.857t-6.857-2.857zM6.857 17.714q0 1.143-.857 2t-2 .857-2-.857-.857-2 .857-2 2-.857 2 .857.857 2z" />
            </svg>
        </button>
    );
} 