"use client";

import { useLanguage } from "@/contexts/language-context";
import { usePost } from "@/contexts/post-context";

/**
 * Language switcher component that toggles between English and Chinese
 */
export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const { bilingualInfo, onLanguageUnavailable } = usePost();

    /** Toggle between English and Chinese */
    const handleLanguageSwitch = () => {
        const targetLanguage = language === "en" ? "zh" : "en";

        // If we're in a post context, check bilingual availability
        if (bilingualInfo) {
            const hasTargetLanguage = targetLanguage === "en" ? bilingualInfo.hasEn : bilingualInfo.hasZh;

            if (hasTargetLanguage) {
                setLanguage(targetLanguage);
            } else {
                // Show notification that post is only available in current language
                const currentLangName = language === "en" ? "English" : "中文";
                const message = language === "en"
                    ? `This post is only available in ${currentLangName}`
                    : `此文章仅提供${currentLangName}版本`;

                if (onLanguageUnavailable) {
                    onLanguageUnavailable(message);
                }
            }
        } else {
            // Normal language switching when not in a post
            setLanguage(targetLanguage);
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