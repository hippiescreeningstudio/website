"use client";

import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Notification } from "@/app/_components/notification";
import { PostProvider } from "@/contexts/post-context";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default function PostPage(props: Params) {
  const { language, setLanguage } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");
  const [notFoundError, setNotFoundError] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    isVisible: boolean;
  }>({ message: "", isVisible: false });
  const [bilingualInfo, setBilingualInfo] = useState<{
    hasEn: boolean;
    hasZh: boolean;
  }>({ hasEn: false, hasZh: false });

  // Set language to English when component mounts
  useEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  useEffect(() => {
    const getParams = async () => {
      const params = await props.params;
      setSlug(params.slug);
    };
    getParams();
  }, [props.params]);

  // Check if post is bilingual
  useEffect(() => {
    if (!slug) return;

    const checkBilingual = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/bilingual`);
        if (response.ok) {
          const info = await response.json();
          setBilingualInfo(info);
        }
      } catch (error) {
        console.error("Error checking bilingual status:", error);
      }
    };

    checkBilingual();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      setLoading(true);
      setNotFoundError(false);

      try {
        const response = await fetch(`/api/posts/${slug}?language=${language}`);

        if (response.status === 404) {
          setNotFoundError(true);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const foundPost = await response.json();
        const htmlContent = await markdownToHtml(foundPost.content || "");
        setPost(foundPost);
        setContent(htmlContent);
      } catch (error) {
        console.error("Error loading post:", error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, language]);

  const handleLanguageUnavailable = (message: string) => {
    setNotification({ message, isVisible: true });
  };

  const closeNotification = () => {
    setNotification({ message: "", isVisible: false });
  };

  if (loading) {
    return (
      <main>
        <Container>
          <PostProvider
            slug={slug}
            bilingualInfo={bilingualInfo}
            onLanguageUnavailable={handleLanguageUnavailable}
          >
            <Intro />
          </PostProvider>
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === "en" ? "Loading..." : "加载中..."}
            </p>
          </div>
        </Container>
      </main>
    );
  }

  if (notFoundError || !post) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <PostProvider
          slug={slug}
          bilingualInfo={bilingualInfo}
          onLanguageUnavailable={handleLanguageUnavailable}
        >
          <Intro />
        </PostProvider>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImages={post.coverImages}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </main>
  );
}
