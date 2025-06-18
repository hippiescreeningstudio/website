"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { HeroPostsCarousel } from "@/app/_components/hero-posts-carousel";
import { PostGrid } from "@/app/_components/post-grid";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

function ScreeningTable() {
  const { language } = useLanguage();

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-4">
        {language === "en" ? "Upcoming Screenings" : "即将放映"}
      </h2>
      <div className="overflow-x-auto">
        <div className="prose dark:prose-invert max-w-none">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="w-1/3">{language === "en" ? "Film" : "电影"}</th>
                <th className="w-1/4">{language === "en" ? "Screening Time" : "放映时间"}</th>
                <th className="w-1/4">{language === "en" ? "Venue" : "地点"}</th>
                <th className="w-1/6">{language === "en" ? "Ticket" : "购票"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="whitespace-normal">The Last Year of Darkness 午夜出走</td>
                <td className="whitespace-nowrap">March 15, 2024 19:00</td>
                <td className="whitespace-nowrap">Cinema Hall</td>
                <td className="whitespace-nowrap">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {language === "en" ? "Get Tickets" : "购票"}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
      <main>
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
      <main>
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
    <main>
      <Container>
        <Intro />
        {/* Hero Posts Carousel */}
        {heroPosts.length > 0 && (
          <div className="mb-16">
            <HeroPostsCarousel posts={heroPosts} />
          </div>
        )}
        {/* Screening Table */}
        <ScreeningTable />
        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <div className="mb-16">
            <PostGrid posts={regularPosts} />
          </div>
        )}
      </Container>
      <Footer />
    </main>
  );
}
