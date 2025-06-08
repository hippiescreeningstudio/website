"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ThemeSwitcher } from "./theme-switcher";

export function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
    <section className="flex items-center justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center">
        {/* Logo for light mode (black logo on white background) */}
        <Link href="/" className="mr-3 md:mr-4 block dark:hidden hover:opacity-80 transition-opacity">
          <Image
            src="/assets/logo-white-bg.svg"
            alt="HSS Logo"
            width={50}
            height={50}
            className="md:w-20 md:h-20"
          />
        </Link>
        {/* Logo for dark mode (white logo on black background) */}
        <Link href="/" className="mr-3 md:mr-4 hidden dark:block hover:opacity-80 transition-opacity">
          <Image
            src="/assets/logo-black-bg.svg"
            alt="HSS Logo"
            width={50}
            height={50}
            className="md:w-20 md:h-20"
          />
        </Link>
        <div className="flex flex-col">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-[22px] md:text-3xl font-bold tracking-tighter leading-tight">
              Hippie Screnning Studio
            </h1>
          </Link>
          <h4 className="text-left text-[12px] md:text-left md:text-base mt-1">
            bring you Asian arthouse films in Munich
          </h4>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative" ref={navRef}>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ThemeSwitcher />
          <Link
            href="/about"
            className="text-[22px] text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            About
          </Link>
          <Link
            href="/team"
            className="text-[22px] text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Team
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
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
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-black rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
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

      {/* Overlay for mobile menu - click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </section>
  );
}
