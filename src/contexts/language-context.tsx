"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "en" | "zh";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
    en: {
        "nav.about": "About",
        "nav.team": "Team",
        "site.title": "Hippie Screening Studio",
        "site.subtitle": "Sinophone & Asian film screenings in Munich",
        "footer.follow": "Follow us on",
        "footer.contact": "Contact",
        "footer.copyright": "Hippie Screening Studio. All rights reserved.",
        "posts.more": "Past screenings",
        "post.read": "Read More",
        "search.button": "Search",
        "search.placeholder": "Search posts...",
        "search.loading": "Searching...",
        "search.noResults": "No results found",
        "rss.subscribe": "Subscribe to RSS",
        "rss.description": "Get notified of new posts via RSS feed",
        "rss.button": "Subscribe",
        "rss.copy": "Copy RSS URL",
    },
    zh: {
        "nav.about": "关于我们",
        "nav.team": "团队成员",
        "site.title": "嬉皮放映室",
        "site.subtitle": "独立策划华语及亚洲电影放映活动",
        "footer.follow": "关注我们",
        "footer.contact": "联系我们",
        "footer.copyright": "嬉皮放映室。保留所有权利。",
        "posts.more": "过往活动",
        "post.read": "阅读更多",
        "search.button": "搜索",
        "search.placeholder": "搜索文章...",
        "search.loading": "搜索中...",
        "search.noResults": "未找到相关结果",
        "rss.subscribe": "订阅 RSS",
        "rss.description": "通过 RSS 订阅获取最新文章通知",
        "rss.button": "订阅",
        "rss.copy": "复制 RSS 链接",
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        // Get saved language from localStorage
        const savedLanguage = localStorage.getItem("hss-language") as Language;
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
            setLanguageState(savedLanguage);
        }

        // Listen for language changes from other tabs or components
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "hss-language" && e.newValue) {
                setLanguageState(e.newValue as Language);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("hss-language", lang);
        // Trigger storage event for other components
        window.dispatchEvent(new StorageEvent("storage", {
            key: "hss-language",
            newValue: lang,
        }));
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations[typeof language]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
} 