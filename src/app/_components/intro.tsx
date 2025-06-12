"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { Search } from "./search";
import { useLanguage } from "@/contexts/language-context";
import { usePost } from "@/contexts/post-context";
import { generateColorPalette } from "@/lib/color-utils";

export function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { backgroundColor } = usePost();

  // Generate color palette based on post background color
  const colorPalette = backgroundColor ? generateColorPalette(backgroundColor) : null;
  const headerBgColor = colorPalette ? colorPalette.header : '#000000';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchStateChange = (searchOpen: boolean) => {
    setIsSearchOpen(searchOpen);
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
    <>
      {/* Blur Backdrop */}
      {(isOpen || isSearchOpen) && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 transition-all duration-300" />
      )}

      <section
        className="sticky top-0 z-50 transition-all duration-300 -ml-5 -mr-5"
        style={{ backgroundColor: headerBgColor }}
      >
        <div className="relative">
          <div className="container mx-auto px-5">
            <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-1 min-h-[32px]' : 'py-2 md:py-2'
              }`}>
              <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'pl-2 md:-ml-2' : 'pl-1 md:-ml-3'}`}>
                {/* Logo for dark mode only */}
                <Link href="/" className={`hover:opacity-80 transition-all duration-300 ${isScrolled ? 'mr-1.5' : 'mr-3 md:mr-4'
                  }`}>
                  <Image
                    src="/favicon/logo_white.png"
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
                      <h1 className="text-lg md:text-2xl font-bold tracking-tighter leading-tight text-white">
                        {t("site.title")}
                      </h1>
                    </Link>
                    <h4 className="text-[10px] md:text-sm mt-0 text-white">
                      {t("site.subtitle")}
                    </h4>
                  </div>
                )}
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:block relative" ref={desktopNavRef}>
                <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'space-x-3' : 'space-x-4'
                  }`}>
                  <LanguageSwitcher />
                  <Search onStateChange={handleSearchStateChange} />
                  <Link
                    href="/about"
                    className={`text-white hover:scale-105 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-lg'
                      }`}
                  >
                    {t("nav.about")}
                  </Link>
                  <Link
                    href="/team"
                    className={`text-white hover:scale-105 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-lg'
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
            <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'space-x-1.5 mr-1' : 'space-x-1 mr-1'
              }`}>
              {/* Hamburger Button */}
              <button
                onClick={toggleMenu}
                className={`text-white hover:text-gray-300 transition-all duration-300 ${isScrolled ? 'p-1' : 'p-2'
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
                <div
                  className="absolute right-0 top-full w-30 shadow-lg -mt-1 border border-gray-600 z-50"
                  style={{ backgroundColor: headerBgColor }}
                >
                  {/* First row: Language switcher, Search */}
                  <div className="flex items-center justify-center space-x-6 px-4 py-3 border-b border-gray-700">
                    <LanguageSwitcher />
                    <Search onStateChange={handleSearchStateChange} />
                  </div>
                  {/* Navigation links */}
                  <div className="py-1">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800/50 hover:scale-105 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.about")}
                    </Link>
                    <Link
                      href="/team"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800/50 hover:scale-105 transition-all duration-300"
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
    </>
  );
}
