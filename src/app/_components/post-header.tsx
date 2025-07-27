import Avatar from "./avatar";
import CoverImage from "./cover-image";
import { ImageCarousel } from "./image-carousel";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImages: string[];
  date: string;
  author?: Author;
};

export function PostHeader({ title, coverImages, date, author }: Props) {
  // Use carousel if multiple images are provided
  const shouldUseCarousel = coverImages && coverImages.length > 1;
  const coverImage = coverImages?.[0] || "/default-cover.jpg"; // First image as cover

  return (
    <>
      <div className="mt-8 md:mt-12">
        <PostTitle>{title}</PostTitle>
      </div>
      {author && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      )}

      {/* Image carousel with margins */}
      <div className="mb-4 md:mb-8">
        {shouldUseCarousel ? (
          <ImageCarousel
            images={coverImages.map(img => ({ src: img, alt: title }))}
            autoplayInterval={4000}
            className="rounded-lg overflow-hidden"
          />
        ) : (
          <CoverImage title={title} src={coverImage} />
        )}
      </div>

      <div className="max-w-2xl mx-auto">
        {author && (
          <div className="block md:hidden mb-6">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
      </div>
    </>
  );
}
