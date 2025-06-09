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
        "site.subtitle": "bring you Asian arthouse films in Munich",
        "footer.follow": "Follow us on",
        "footer.contact": "Contact",
        "footer.copyright": "Hippie Screening Studio. All rights reserved.",
        "posts.more": "More Stories",
        "post.read": "Read More",
    },
    zh: {
        "nav.about": "关于",
        "nav.team": "团队",
        "site.title": "嬉皮放映室",
        "site.subtitle": "向您在慕尼黑呈现亚洲艺术电影",
        "footer.follow": "关注我们",
        "footer.contact": "联系我们",
        "footer.copyright": "嬉皮放映室。保留所有权利。",
        "posts.more": "更多故事",
        "post.read": "阅读更多",
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