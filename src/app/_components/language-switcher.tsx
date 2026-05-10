"use client";

import { usePost } from "@/contexts/post-context";
import { useRouter, usePathname } from "next/navigation";

/**
 * Language switcher component that toggles between English and Chinese.
 *
 * Source of truth is the URL `pathname`, not the `language` context state.
 * The context state is set imperatively from each page's mount effect and
 * can lag behind the URL during async navigation, which previously left
 * the switcher stuck (button text and toggle direction both desynced).
 */
export const LanguageSwitcher = () => {
    const { bilingualInfo, onLanguageUnavailable } = usePost();
    const router = useRouter();
    const pathname = usePathname();

    const isOnZh = pathname === "/zh" || pathname.startsWith("/zh/");
    const targetLanguage: "en" | "zh" = isOnZh ? "en" : "zh";

    const handleLanguageSwitch = () => {
        // If we're in a post context, check bilingual availability
        if (bilingualInfo) {
            const hasTargetLanguage = targetLanguage === "en" ? bilingualInfo.hasEn : bilingualInfo.hasZh;
            if (!hasTargetLanguage) {
                const currentLangName = isOnZh ? "Chinese" : "English";
                onLanguageUnavailable?.(`This post is only available in ${currentLangName}`);
                return;
            }
        }

        if (isOnZh) {
            const englishPath = pathname.replace(/^\/zh/, "") || "/";
            router.push(englishPath);
        } else {
            router.push(`/zh${pathname}`);
        }
    };

    return (
        <button
            className="flex items-center justify-center rounded-full cursor-pointer h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 text-white"
            onClick={handleLanguageSwitch}
            aria-label={`Switch to ${isOnZh ? "English" : "Chinese"}`}
        >
            <span className="text-m">
                {isOnZh ? "EN" : "中"}
            </span>
        </button>
    );
};
