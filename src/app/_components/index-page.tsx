"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { HeroPostsCarousel } from "@/app/_components/hero-posts-carousel";
import { Footer } from "@/app/_components/footer";
import { QuestionnaireSection } from "@/app/_components/questionnaire-section";
import { FeedbackSection } from "@/app/_components/feedback-section";
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
    posters?: string[];
    tickets?: { label: string; url: string }[];
    duration: string;
    genre: string;
    venue: string;
    time: string;
    ticketUrl?: string;
  };
  const screenings: Screening[] = [
    {
      id: 1,
      title: "Echoes of Times 时代回响",
      slug: "echoes_of_times",
      poster: "/assets/blog/echoes_of_times/poster/crows_and_sparrows.jpg",
      posters: [
        "/assets/blog/echoes_of_times/poster/crows_and_sparrows.jpg",
        "/assets/blog/echoes_of_times/poster/big_little_old_li.jpg",
        "/assets/blog/echoes_of_times/poster/legend_of_tianyun_mountain.jpg",
      ],
      duration: "3 films, 4K restorations",
      genre: "Classic Chinese Cinema",
      venue: "Neues Rottmann Kino",
      time: "Oct 24 – 25",
      tickets: [
        { label: "Oct 24 · Crows and Sparrows", url: "https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3674378069&bgswitch=false&resize=false#/show/750223040/3674378069" },
        { label: "Oct 25 · Big Li, Little Li and Old Li", url: "https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3674378546&bgswitch=false&resize=false#/show/750223040/3674378546" },
        { label: "Oct 25 · Legend of Tianyun Mountain", url: "https://booking.cinetixx.de/frontend/index.html?cinemaId=750223040&showId=3675619408&bgswitch=false&resize=false" },
      ],
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">
        {language === "en" ? "Upcoming Screenings" : "即将放映"}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {screenings.map((screening) => (
          <div key={screening.id} className={`flex bg-black ${screening.posters ? "lg:col-span-2" : ""} shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
            {/* First Column - Poster */}
            <div className={`flex-shrink-0 h-48 md:h-96 ${screening.posters ? "w-48 md:w-[36rem]" : "w-32 md:w-72"}`}>
              <a href={`${language === "zh" ? "/zh" : ""}/films/${screening.slug}`} className="flex h-full">
                {(screening.posters ?? [screening.poster]).map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${screening.title} poster`}
                    className="min-w-0 flex-1 h-full object-cover hover:scale-110 transition-all duration-300"
                  />
                ))}
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
                
                {/* Per-showing ticket buttons */}
                {screening.tickets && (
                  <div className="flex flex-col items-start gap-2">
                    {screening.tickets.map((t) => (
                      <a
                        key={t.url}
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white font-medium py-1 px-3 md:px-4 rounded-3xl transition-all duration-200 text-xs md:text-sm bg-[#008009] hover:bg-[#59b300]"
                      >
                        {t.label}
                      </a>
                    ))}
                  </div>
                )}

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
        
        {/* Segmentation Line */}
        <div className="my-16 w-full h-px bg-white/40"></div>
        
        {/* Survey and Feedback Sections */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2">
          {/* Questionnaire Section */}
          <div className="md:pr-32">
            <QuestionnaireSection />
          </div>
          
          {/* Mobile Divider */}
          <div className="md:hidden my-16 w-full h-px bg-white/40"></div>
          
          {/* Feedback Section */}
          
            <FeedbackSection />
        </div>
      </Container>
      <Footer />
    </main>
  );
} 