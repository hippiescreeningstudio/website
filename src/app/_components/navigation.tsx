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
  const [isPastScreeningsDropdownOpen, setIsPastScreeningsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const { backgroundColor } = usePost();
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/zh";
  const isPostPage = pathname.includes("/films/") || pathname.includes("/zh/films/");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchStateChange = (searchOpen: boolean) => {
    setIsSearchOpen(searchOpen);
  };


  const years = [2025, 2024, 2023, 2022];

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

  // Close dropdown when clicking outside (only for desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle desktop dropdown close, not mobile
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && window.innerWidth >= 768) {
        setIsPastScreeningsDropdownOpen(false);
      }
    };

    if (isPastScreeningsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isPastScreeningsDropdownOpen]);

  return (
    <>
      <style jsx global>{`
        .header-image {
          background-color: ${backgroundColor || '#000000'};
        }
      `}</style>

      <section className="relative z-50">
        <div className="fixed top-0 left-0 right-0">
          <nav className={`transition-all duration-300 ${isPostPage && !isHomePage && isScrolled && !isOpen
            ? 'md:bg-transparent md:backdrop-blur-md'
            : 'bg-transparent'
            }`}>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
              <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-8' : 'h-16'}`}>
                  {/* Logo and Title */}
                  <div className="flex items-center space-x-3">
                    <Link href={language === "zh" ? "/zh" : "/"} className="hover:opacity-80 transition-all duration-300">
                      <Image
                        src="/favicon/logo_white_xipi.png"
                        alt="HSS Logo"
                        width={isScrolled ? 28 : 40}
                        height={isScrolled ? 28 : 40}
                        className={`transition-all duration-300 ${isScrolled ? 'md:w-8 md:h-8' : 'md:w-16 md:h-16'}`}
                      />
                    </Link>
                    {!isScrolled && (
                      <Link href={language === "zh" ? "/zh" : "/"} className="text-white hover:opacity-80 transition-all duration-300">
                        <h1 className="font-bold text-xl md:text-2xl -ml-2">
                          {t("site.title")}
                        </h1>
                      </Link>
                    )}
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden text-lg md:flex items-center space-x-4">
                    <Search onStateChange={handleSearchStateChange} />
                    <LanguageSwitcher />
                    
                    {/* Past Screenings Dropdown */}
                    <div 
                      className="relative"
                      ref={dropdownRef}
                      onMouseEnter={() => setIsPastScreeningsDropdownOpen(true)}
                      onMouseLeave={() => setIsPastScreeningsDropdownOpen(false)}
                    >
                      <button className="text-white hover:underline transition-colors flex items-center">
                        {language === "zh" ? "往期放映" : "Past Screenings"}

                      </button>
                      
                                              {isPastScreeningsDropdownOpen && (
                          <div className="absolute top-full left-0 -mt-0.5 w-full backdrop-blur-md bg-black/40 border border-white/30 z-50">
                            <div className="py-2">
                            {years.map((year) => (
                              <Link
                                key={year}
                                href={language === "zh" ? `/zh/past-screenings/${year}` : `/past-screenings/${year}`}
                                className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                              >
                                {year}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link
                      href={language === "zh" ? "/zh/about" : "/about"}
                      className="text-white hover:underline transition-colors"
                    >
                      {t("nav.about")}
                    </Link>
                    <Link
                      href={language === "zh" ? "/zh/team" : "/team"}
                      className="text-white hover:underline transition-colors"
                    >
                      {t("nav.team")}
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="md:hidden flex items-center">
                    <button
                      onClick={toggleMenu}
                      className="text-white hover:underline transition-colors"
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
                    <>
                      {/* Backdrop with blur effect */}
                      <div 
                        className={`fixed inset-0 z-40 backdrop-blur-md bg-black/20`}
                        onClick={() => {
                          setIsOpen(false);
                          setIsPastScreeningsDropdownOpen(false);
                        }}
                      />
                      {/* Mobile Menu Content */}
                      <div className={`absolute right-0 top-full -mt-5 w-60 shadow-lg z-50 backdrop-blur-md bg-black/40
                      }`}>
                        {/* First row: Language switcher, Search */}
                        <div className="flex items-center justify-left space-x-6 px-4 py-3">
                        <Search onStateChange={handleSearchStateChange} />
                          <LanguageSwitcher />
                        </div>
                      {/* Navigation links */}
                      <div className="py-1">
                        {/* Past Screenings Mobile Dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Past Screenings button clicked, current state:', isPastScreeningsDropdownOpen);
                              setIsPastScreeningsDropdownOpen(!isPastScreeningsDropdownOpen);
                            }}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 relative z-[55]"
                          >
                            <span>{language === "zh" ? "往期放映" : "Past Screenings"}</span>
                            <svg 
                              className="h-4 w-4 transition-transform duration-200"
                              style={{ transform: isPastScreeningsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {isPastScreeningsDropdownOpen && (
                            <div className={`relative z-[70] pointer-events-auto bg-black/60
                            }`}>
                              {years.map((year) => (
                                <button
                                  key={year}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('Year clicked:', year);
                                    window.location.href = language === "zh" ? `/zh/past-screenings/${year}` : `/past-screenings/${year}`;
                                  }}
                                  className="block w-full text-left px-8 py-2 text-sm text-white hover:bg-white/10 transition-colors relative z-[71] pointer-events-auto"
                                >
                                  {year}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

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
                    </>
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
