"use client";

import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";

export function RSSSubscription() {
    const { language, t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const rssUrl = `${window.location.origin}/rss.xml`;

    const copyRSSUrl = async () => {
        try {
            await navigator.clipboard.writeText(rssUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy RSS URL:', error);
        }
    };

    const handleRSSClick = () => {
        window.open(rssUrl, '_blank');
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
                {/* RSS Icon */}
                <svg
                    className="w-6 h-6 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M3.429 2.571v2.286q5.714 0 9.857 4.143t4.143 9.857h2.286q0-7.714-5.5-13.214t-13.214-5.5zM3.429 7.143v2.286q2.571 0 4.429 1.857t1.857 4.429h2.286q0-4-2.857-6.857t-6.857-2.857zM6.857 17.714q0 1.143-.857 2t-2 .857-2-.857-.857-2 .857-2 2-.857 2 .857.857 2z" />
                </svg>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("rss.subscribe")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("rss.description")}
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleRSSClick}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors text-sm font-medium"
                >
                    {t("rss.button")}
                </button>

                <button
                    onClick={copyRSSUrl}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors text-sm"
                    title={t("rss.copy")}
                >
                    {copied ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
} 