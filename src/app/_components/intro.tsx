"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { Search } from "./search";
import { useLanguage } from "@/contexts/language-context";
import { usePost } from "@/contexts/post-context";
import { usePathname } from "next/navigation";

export function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const { backgroundColor } = usePost();
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/zh";
  const isPostPage = pathname.includes("/posts/") || pathname.includes("/zh/posts/");

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
      {/* Blur backdrop for post pages */}
      {isPostPage && isOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 z-40 transition-all duration-300" />
      )}

      <section className="relative z-50">
        <div className="fixed top-0 left-0 right-0">
          <nav className={`transition-all duration-300 ${isPostPage && !isHomePage && (isOpen || (isScrolled && window.innerWidth < 768))
            ? 'md:bg-transparent backdrop-blur-md'
            : 'bg-transparent'
            }`}>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
              <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}>
                  {/* Logo and Title */}
                  <div className="flex items-center space-x-3">
                    <Link href={language === "zh" ? "/zh" : "/"} className="hover:opacity-80 transition-all duration-300">
                      <Image
                        src="/favicon/logo_white.png"
                        alt="HSS Logo"
                        width={isScrolled ? 28 : 40}
                        height={isScrolled ? 28 : 40}
                        className={`transition-all duration-300 ${isScrolled ? 'md:w-8 md:h-8' : 'md:w-16 md:h-16'}`}
                      />
                    </Link>
                    {!isScrolled && (
                      <Link href={language === "zh" ? "/zh" : "/"} className="text-white hover:opacity-80 transition-all duration-300">
                        <h1 className="font-bold text-xl md:text-2xl">
                          {t("site.title")}
                        </h1>
                      </Link>
                    )}
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-4">
                    <LanguageSwitcher />
                    <Search onStateChange={handleSearchStateChange} />
                    <Link
                      href={language === "zh" ? "/zh/about" : "/about"}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {t("nav.about")}
                    </Link>
                    <Link
                      href={language === "zh" ? "/zh/team" : "/team"}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {t("nav.team")}
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="md:hidden flex items-center">
                    <button
                      onClick={toggleMenu}
                      className="text-white hover:text-gray-300 transition-colors"
                      aria-label="Toggle menu"
                    >
                      <svg
                        className="h-6 w-6"
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
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                  {isOpen && (
                    <div className={`absolute right-0 top-full w-30 shadow-lg z-50 ${isPostPage ? 'bg-black/80' : 'backdrop-blur-md bg-black/40'
                      }`}>
                      {/* First row: Language switcher, Search */}
                      <div className="flex items-center justify-center space-x-6 px-4 py-3">
                        <LanguageSwitcher />
                        <Search onStateChange={handleSearchStateChange} />
                      </div>
                      {/* Navigation links */}
                      <div className="py-1">
                        <Link
                          href={language === 'zh' ? '/zh/about' : '/about'}
                          className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          {t("nav.about")}
                        </Link>
                        <Link
                          href={language === 'zh' ? '/zh/team' : '/team'}
                          className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          {t("nav.team")}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
