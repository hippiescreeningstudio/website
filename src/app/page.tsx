"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { HeroPostsCarousel } from "@/app/_components/hero-posts-carousel";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

function ScreeningTable() {
  const { language } = useLanguage();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  // Screening data with poster images and additional metadata
  const screenings = [

    {
      id: 2,
      title: "K-Family Affairs 애국소녀",
      slug: "k_family",
      poster: "/assets/blog/k_family/poster.jpg",
      duration: "91 min",
      genre: "Documentary, Political",
      venue: "Neues Rottmann",
      time: "Aug 9, 14:00",
      ticketUrl: "https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3256995109"
    },
    {
      id: 3,
      title: "Snow in Midsummer 五月雪",
      slug: "midsummer_snow",
      poster: "/assets/blog/midsummer_snow/poster.png",
      duration: "116 min",
      genre: "Drama, History",
      venue: "To be announced",
      time: "Aug 24",
      // ticketUrl: "https://www.eventim-light.com/de/a/65330d104b070869ec1cb7b8"
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">
        {language === "en" ? "Upcoming Screenings" : "即将放映"}
      </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {screenings.map((screening) => (
          <div key={screening.id} className="flex bg-black shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* First Column - Poster */}
            <div className="flex-shrink-0 w-40 md:w-60">
              <a href={`/posts/${screening.slug}`} className="block h-full">
                <img
                  src={screening.poster}
                  alt={`${screening.title} poster`}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                />
              </a>
            </div>
            
            {/* Second Column - Film Information */}
            <div className="flex-1 p-4 md:p-5 flex flex-col justify-end space-y-4">
              {/* Film Title */}
              <div>
                <a 
                  href={`/posts/${screening.slug}`} 
                  className="text-lg md:text-xl font-bold text-white hover:underline transition-colors duration-300 block"
                >
                  {screening.title}
                </a>
                {/* Duration and Genre */}
                <p className="text-sm md:text-base text-gray-200 mt-1">
                  {screening.duration} | {screening.genre}
                </p>
              </div>
              
              {/* Venue and Time */}
              <div>
                <p className="text-sm md:text-base text-white">
                  <span className="font-medium">{screening.venue}</span>
                  <span className="mx-2">•</span>
                  <span>{screening.time}</span>
                </p>
              </div>
              
              {/* Get Ticket Button */}
              {screening.ticketUrl && (
                <div>
                  <a
                    href={screening.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white font-medium py-2 px-3 md:px-4 rounded-3xl transition-all duration-200 text-xs md:text-sm"
                    style={{ 
                      backgroundColor: hoveredButton === screening.id ? '#59b300' : '#008009'
                    }}
                    onMouseEnter={() => setHoveredButton(screening.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {language === "en" ? "Get Tickets" : "购买门票"}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
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

  // Filter to get only hero posts
  const heroPosts = posts.filter(post => post.isHero);

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
      </Container>
      <Footer />
    </main>
  );
}
