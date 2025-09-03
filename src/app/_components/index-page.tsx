"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { HeroPostsCarousel } from "@/app/_components/hero-posts-carousel";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

function ScreeningTable() {
  const { language } = useLanguage();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  // Screening data with poster images and additional metadata
  type Screening = {
    id: number;
    title: string;
    slug: string;
    poster: string;
    duration: string;
    genre: string;
    venue: string;
    time: string;
    ticketUrl?: string;
  };
  const screenings: Screening[] = [
    {
      id: 1,
      title: "Love and Bruises 花",
      slug: "love_and_bruises",
      poster: "/assets/blog/love_and_bruises/poster.png",
      duration: "105 min",
      genre: "Drama, Romance",
      venue: "Werkstattkino",
      time: "September, to be announced",
      // ticketUrl: "https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3256995109"
    },
    {
      id: 2,
      title: "Nest 巢",
      slug: "nest",
      poster: "/assets/blog/nest/poster.jpg",
      duration: "90 minutes",
      genre: "Documentary",
      venue: "Werkstattkino",
      time: "October, to be announced",
      // ticketUrl: "https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3291158900&bgswitch=false&resize=false#/show/750223040/3291158900"
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
            <div className="flex-shrink-0 w-32 md:w-72 h-48 md:h-96">
              <a href={`${language === "zh" ? "/zh" : ""}/films/${screening.slug}`} className="block h-full">
                <img
                  src={screening.poster}
                  alt={`${screening.title} poster`}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                />
              </a>
            </div>
            
            {/* Second Column - Film Information */}
            <div className="flex-1 p-4 md:p-5 flex flex-col justify-between h-48 md:h-96">
              <div className="flex-1"></div>
              <div className="space-y-4">
                {/* Film Title */}
                <div>
                  <a 
                    href={`${language === "zh" ? "/zh" : ""}/films/${screening.slug}`} 
                    className="text-base md:text-xl font-bold text-white hover:underline transition-colors duration-300 block"
                  >
                    {screening.title}
                  </a>
                  {/* Duration and Genre */}
                  <p className="text-xs md:text-base text-gray-200 mt-1">
                    {screening.duration} | {screening.genre}
                  </p>
                </div>
                
                {/* Venue and Time */}
                <div>
                  <p className="text-sm md:text-base text-white font-medium">
                    {screening.venue}
                  </p>
                  <p className="text-sm md:text-base text-white">
                    {screening.time}
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
                      {language === "en" ? "Get Tickets" : "购票"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SharedIndexPage({ targetLanguage }: { targetLanguage: "en" | "zh" }) {
  const { language, setLanguage } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Set language when component mounts
  useEffect(() => {
    setLanguage(targetLanguage);
  }, [setLanguage, targetLanguage]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/films?language=${targetLanguage}`);
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
  }, [targetLanguage]);

  if (loading) {
    return (
      <main>
        <Container>
          <Intro />
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {targetLanguage === "en" ? "Loading..." : "加载中..."}
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
              {targetLanguage === "en" ? "No posts available" : "暂无文章"}
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