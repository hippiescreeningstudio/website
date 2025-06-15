import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage?: string; // Optional, derived from first image in coverImages
  coverImages: string[]; // Primary array of all images for desktop
  mobileCoverImages?: string[]; // Optional array of images for mobile
  author?: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  language?: "en" | "zh";
  backgroundColor?: string; // Optional background color for the post
  isHero?: boolean; // Indicates if this post should be shown in the hero carousel
  overlayText?: {
    title: string;
    subtitle: string;
  };
};
