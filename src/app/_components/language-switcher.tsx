"use client";

import { useLanguage } from "@/contexts/language-context";
import { usePost } from "@/contexts/post-context";
import { useRouter, usePathname } from "next/navigation";

/**
 * Language switcher component that toggles between English and Chinese
 */
export const LanguageSwitcher = () => {
    const { language } = useLanguage();
    const { bilingualInfo, onLanguageUnavailable } = usePost();
    const router = useRouter();
    const pathname = usePathname();

    /** Toggle between English and Chinese */
    const handleLanguageSwitch = () => {
        const targetLanguage = language === "en" ? "zh" : "en";

        // If we're in a post context, check bilingual availability
        if (bilingualInfo) {
            const hasTargetLanguage = targetLanguage === "en" ? bilingualInfo.hasEn : bilingualInfo.hasZh;

            if (!hasTargetLanguage) {
                // Show notification that post is only available in current language
                const currentLangName = language === "en" ? "English" : "中文";
                const message = language === "en"
                    ? `This post is only available in ${currentLangName}`
                    : `此文章仅提供${currentLangName}版本`;

                if (onLanguageUnavailable) {
                    onLanguageUnavailable(message);
                }
                return;
            }
        }

        // Navigate to the correct URL based on target language
        if (targetLanguage === "zh") {
            // Switching to Chinese
            if (pathname.startsWith("/zh")) {
                // Already on Chinese route, no change needed
                return;
            } else {
                // Navigate to Chinese version
                router.push(`/zh${pathname}`);
            }
        } else {
            // Switching to English
            if (pathname.startsWith("/zh")) {
                // Remove /zh prefix to go to English version
                const englishPath = pathname.replace("/zh", "") || "/";
                router.push(englishPath);
            } else {
                // Already on English route, no change needed
                return;
            }
        }
    };

    return (
        <button
            className="flex items-center justify-center rounded-full cursor-pointer h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 text-black dark:text-white"
            onClick={handleLanguageSwitch}
            aria-label={`Switch to ${language === "en" ? "Chinese" : "English"}`}
        >
            <span className="text-sm font-semibold">
                {language === "en" ? "中" : "EN"}
            </span>
        </button>
    );
}; 