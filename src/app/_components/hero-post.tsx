"use client";

import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { ImageCarousel } from "./image-carousel";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { useLanguage } from "@/contexts/language-context";

type Props = {
  title: string;
  coverImages: string[];
  date: string;
  excerpt: string;
  author?: Author;
  slug: string;
  backgroundColor?: string;
};

export function HeroPost({
  title,
  coverImages,
  date,
  excerpt,
  author,
  slug,
  backgroundColor,
}: Props) {
  const { language } = useLanguage();
  const shouldUseCarousel = coverImages && coverImages.length > 1;
  const coverImage = coverImages?.[0] || "/default-cover.jpg"; // First image as cover

  // Generate language-specific URL
  const postUrl = language === "zh" ? `/zh/posts/${slug}` : `/posts/${slug}`;

  return (
    <section className="p-6 rounded-lg transition-colors duration-200">
      <div className="mb-8 md:mb-16">
        {shouldUseCarousel ? (
          <Link href={postUrl} aria-label={title}>
            <ImageCarousel
              images={coverImages.map(img => ({ src: img, alt: title }))}
              autoplayInterval={6000}
              className="rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200"
            />
          </Link>
        ) : (
          <CoverImage title={title} src={coverImage} slug={slug} />
        )}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={postUrl} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}
