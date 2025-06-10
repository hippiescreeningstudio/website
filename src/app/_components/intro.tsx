"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { Search } from "./search";
import { useLanguage } from "@/contexts/language-context";

export function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Track scroll position with hysteresis to prevent flickering
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;

          // Use different thresholds for collapsing vs expanding to prevent flickering
          if (!isScrolled && scrollPosition > 120) {
            setIsScrolled(true); // Collapse after scrolling 120px
          } else if (isScrolled && scrollPosition < 60) {
            setIsScrolled(false); // Expand when scrolling back up to 60px
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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

  return (
    <section className="sticky top-0 z-50 bg-white dark:bg-black transition-all duration-300 -ml-5 -mr-5">
      <div className="relative">
        <div className="container mx-auto px-5">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-0.5 min-h-[32px]' : 'py-4 md:py-6'
            }`}>
            <div className={`flex items-center transition-all duration-300`}>
              {/* Logo for light mode */}
              <Link href="/" className={`block dark:hidden hover:opacity-80 transition-all duration-300 ${isScrolled ? 'mr-1.5' : 'mr-3 md:mr-4'
                }`}>
                <Image
                  src="/assets/logo-white-bg.svg"
                  alt="HSS Logo"
                  width={isScrolled ? 28 : 40}
                  height={isScrolled ? 28 : 40}
                  className={`transition-all duration-300 ${isScrolled ? 'md:w-8 md:h-8' : 'md:w-16 md:h-16'
                    }`}
                />
              </Link>
              {/* Logo for dark mode */}
              <Link href="/" className={`hidden dark:block hover:opacity-80 transition-all duration-300 ${isScrolled ? 'mr-1.5' : 'mr-3 md:mr-4'
                }`}>
                <Image
                  src="/assets/logo-black-bg.svg"
                  alt="HSS Logo"
                  width={isScrolled ? 28 : 40}
                  height={isScrolled ? 28 : 40}
                  className={`transition-all duration-300 ${isScrolled ? 'md:w-8 md:h-8' : 'md:w-16 md:h-16'
                    }`}
                />
              </Link>

              {/* Title and subtitle - conditionally render */}
              {!isScrolled && (
                <div className="flex flex-col transition-all duration-300 -ml-2">
                  <Link href="/" className="hover:opacity-80 transition-opacity">
                    <h1 className="text-lg md:text-2xl font-bold tracking-tighter leading-tight">
                      {t("site.title")}
                    </h1>
                  </Link>
                  <h4 className="text-[10px] md:text-sm mt-0">
                    {t("site.subtitle")}
                  </h4>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block relative" ref={desktopNavRef}>
              <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'space-x-3' : 'space-x-4'
                }`}>
                <ThemeSwitcher />
                <LanguageSwitcher />
                <Search />
                <Link
                  href="/about"
                  className={`text-black dark:text-white hover:scale-105 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-lg'
                    }`}
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="/team"
                  className={`text-black dark:text-white hover:scale-105 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-lg'
                    }`}
                >
                  {t("nav.team")}
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation - positioned absolutely to reach the edge */}
        <nav className="md:hidden absolute top-0 right-0 h-full flex items-center" ref={mobileNavRef}>
          <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'space-x-1.5 -mr-1' : 'space-x-1 -mr-1'
            }`}>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Search />
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className={`text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 ${isScrolled ? 'p-1' : 'p-2'
                }`}
              aria-label="Toggle menu"
            >
              <svg
                className={`fill-none stroke-current transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'
                  }`}
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
              <div className="absolute right-0 top-full w-30 bg-white dark:bg-black shadow-lg -mt-1 border border-white dark:border-black z-10">
                <div className="py-1">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.about")}
                  </Link>
                  <Link
                    href="/team"
                    className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.team")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Overlay for mobile menu - click to close */}
        {isOpen && (
          <div
            className="fixed inset-0 z-0 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
