"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import DateFormatter from "./date-formatter";

type SearchResult = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    coverImage: string;
    author?: {
        name: string;
        picture: string;
    };
    language?: "en" | "zh";
};

type SearchProps = {
    onStateChange?: (isOpen: boolean) => void;
};

export function Search({ onStateChange }: SearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { language, t } = useLanguage();
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Notify parent of state changes
    useEffect(() => {
        onStateChange?.(isOpen);
    }, [isOpen, onStateChange]);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setQuery("");
                setResults([]);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Focus input when search opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const searchResults = await response.json();
                setResults(searchResults);
            } else {
                console.error("Failed to search posts");
                setResults([]);
            }
        } catch (error) {
            console.error("Error searching posts:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        performSearch(newQuery);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            performSearch(query);
        }
    };

    const handleSearchClick = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            performSearch(query);
        }
    };

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="relative" ref={searchRef}>
            {/* Search Button */}
            <button
                onClick={handleSearchClick}
                className="text-black dark:text-white hover:scale-105 transition-all duration-300 p-1"
                aria-label={t("search.button")}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>

            {/* Search Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 backdrop-blur-md bg-black/40 rounded-md shadow-lg border-2 border-white/10 z-20">
                    <div className="p-4">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder={t("search.placeholder")}
                                className="w-full px-3 py-2 text-sm border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
                            />
                            <button
                                onClick={handleSearchClick}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="max-h-96 overflow-y-auto border-t border-white/10">
                        {loading && (
                            <div className="p-4 text-center text-white/60">
                                {t("search.loading")}
                            </div>
                        )}

                        {!loading && query && results.length === 0 && (
                            <div className="p-4 text-center text-white/60">
                                {t("search.noResults")}
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <div className="py-2">
                                {results.map((result) => {
                                    // Generate language-specific URL
                                    const postUrl = result.language === "zh"
                                        ? `/zh/posts/${result.slug}`
                                        : `/posts/${result.slug}`;

                                    return (
                                        <Link
                                            key={`${result.slug}-${result.language}`}
                                            href={postUrl}
                                            onClick={handleResultClick}
                                            className="block px-4 py-3 hover:bg-white/10 transition-colors"
                                        >
                                            <div className="text-sm font-medium text-white mb-1">
                                                {result.title}
                                            </div>
                                            <div className="text-xs text-white/60 mb-1">
                                                <DateFormatter dateString={result.date} />
                                            </div>
                                            <div className="text-xs text-white/80 line-clamp-2">
                                                {result.excerpt}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 