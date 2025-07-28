"use client";

import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const { language } = useLanguage();

  // Generate language-specific URL
  const postUrl = slug
          ? (language === "zh" ? `/zh/films/${slug}` : `/films/${slug}`)
    : undefined;

  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
    />
  );

  return (
    <div className="sm:mx-0">
      {postUrl ? (
        <Link href={postUrl} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
