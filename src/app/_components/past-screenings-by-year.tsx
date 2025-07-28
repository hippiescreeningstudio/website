"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { PostGrid } from "@/app/_components/post-grid";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

interface PastScreeningsByYearProps {
  language: "en" | "zh";
  year: number;
}

export function PastScreeningsByYear({ language: pageLanguage, year }: PastScreeningsByYearProps) {
  const { language, setLanguage } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Set language when component mounts
  useEffect(() => {
    setLanguage(pageLanguage);
  }, [setLanguage, pageLanguage]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/films?language=${pageLanguage}`);
        if (response.ok) {
          const fetchedPosts = await response.json();
          setPosts(fetchedPosts);
        } else {
          console.error("Failed to fetch posts");
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pageLanguage]);

  if (loading) {
    return (
      <main style={{ marginTop: '150px' }}>
        <Container>
          <Intro />
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {pageLanguage === "en" ? "Loading..." : "加载中..."}
            </p>
          </div>
        </Container>
      </main>
    );
  }

  // Filter posts by year and exclude hero posts
  const getPostYear = (dateString: string): number => {
    try {
      const date = new Date(dateString);
      return date.getFullYear();
    } catch {
      // If date parsing fails, try to extract year from string
      const yearMatch = dateString.match(/(\d{4})/);
      return yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
    }
  };

  const yearPosts = posts.filter(post => 
    !post.isHero && getPostYear(post.date) === year
  );

  if (yearPosts.length === 0) {
    return (
      <main style={{ marginTop: '150px' }}>
        <Container>
          <Intro />
          <section className="mb-64 pt-16">
            <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8">
              {pageLanguage === "en" ? `Past Screenings ${year}` : `${year}年往期放映`}
            </h1>
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {pageLanguage === "en" ? `No screenings available for ${year}` : `${year}年暂无放映记录`}
              </p>
            </div>
          </section>
        </Container>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ marginTop: '150px' }}>
      <Container>
        <Intro />
        <section className="mb-64 pt-16">
          <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8">
            {pageLanguage === "en" ? `Past Screenings ${year}` : `${year}年往期放映`}
          </h1>
          <div className="mb-16">
            <PostGrid posts={yearPosts} />
          </div>
        </section>
      </Container>
      <Footer />
    </main>
  );
} 