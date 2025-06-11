"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { RSSIcon } from "./rss-icon";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="relative top-0 right-0 mb-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end space-x-6">
                <div className="flex items-center space-x-2 mr-4">
                    <RSSIcon />
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
                <Link
                    href="/about"
                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    About
                </Link>
                <Link
                    href="/team"
                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    Team
                </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-end space-x-2">
                <RSSIcon />
                <LanguageSwitcher />
                <ThemeSwitcher />
                {/* Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="p-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="py-1">
                            <Link
                                href="/about"
                                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/team"
                                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Team
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 