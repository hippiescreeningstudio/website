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
        <div className="w-full overflow-x-auto">
        <table className="table-fixed w-full text-base md:text-lg">
            <thead>
              <tr>
                <th className="w-4/10 text-left font-semibold py-3">{language === "en" ? "Film" : "电影"}</th>
                <th className="w-1/10 text-left font-semibold py-3">{language === "en" ? "Time" : "时间"}</th>
                <th className="w-3/10 text-left font-semibold py-3">{language === "en" ? "Venue" : "地点"}</th>
                <th className="w-2/10 text-left font-semibold py-3">{language === "en" ? "Tickets" : "购票"}</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td className="break-words py-3"><a href="/posts/kaili_blues" className="underline break-words">
                路边野餐
                  </a></td>
                <td className="break-words py-3">七月19日, 14:00</td>
                <td className="break-words py-3">ASTOR Film Lounge</td>
                <td className="break-words py-3"> Coming soon
                </td>
              </tr>
              <tr>
                <td className="break-words py-3"><a href="/posts/k_family" className="underline break-words">
                南韩民主家政课
                  </a></td>
                <td className="break-words py-3">八月9日, 14:00</td>
                <td className="break-words py-3">Neues Rottmann</td>
                <td className="break-words py-3">
                  <a href="https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3256995109" className="text-blue-400 hover:underline break-words">
                    {language === "en" ? "Buy online" : "购票"}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
export default function ChineseIndex() {
    const { setLanguage } = useLanguage();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/posts?language=zh`);
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
                            加载中...
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
                            暂无文章
                        </p>
                    </div>
                </Container>
            </main>
        );
    }

    // Filter posts into hero and regular posts
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