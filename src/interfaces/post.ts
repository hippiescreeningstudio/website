import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage?: string; // Optional, derived from first image in coverImages
  coverImages: string[]; // Primary array of all images
  author?: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  language?: "en" | "zh";
};
