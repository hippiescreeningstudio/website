"use client";

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
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

export function PostPreview({
  title,
  coverImages,
  date,
  excerpt,
  author,
  slug,
  backgroundColor,
}: Props) {
  const { language } = useLanguage();

  const postUrl = language === "zh" ? `/zh/posts/${slug}` : `/posts/${slug}`;

  return (
    <div className="p-4 rounded-lg transition-colors duration-200">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImages[0]}
        />
      </div>
      <h3 className="text-lg md:text-xl mb-3 leading-snug">
        <Link href={postUrl} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-xs mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-base leading-relaxed mb-4">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  );
}
