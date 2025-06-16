"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { HeroPostsCarousel } from "@/app/_components/hero-posts-carousel";
import { PostGrid } from "@/app/_components/post-grid";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

export default function Index() {
  const { language, setLanguage } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Set language to English when component mounts
  useEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts?language=en`);
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
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Container>
          <Intro />
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === "en" ? "Loading..." : "加载中..."}
            </p>
          </div>
        </Container>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="min-h-screen">
        <Container>
          <Intro />
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === "en" ? "No posts available" : "暂无文章"}
            </p>
          </div>
        </Container>
      </main>
    );
  }

  // Split posts into hero posts and regular posts
  const heroPosts = posts.filter(post => post.isHero);
  const regularPosts = posts.filter(post => !post.isHero);

  return (
    <main className="min-h-screen">
      <Container>
        <Intro />
      </Container>
      {/* Hero Posts Carousel */}
      {heroPosts.length > 0 && (
        <div className="mb-16">
          <HeroPostsCarousel posts={heroPosts} />
        </div>
      )}
      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <Container>
          <div className="mb-16">
            <PostGrid posts={regularPosts} />
          </div>
        </Container>
      )}
      <Footer />
    </main>
  );
}
