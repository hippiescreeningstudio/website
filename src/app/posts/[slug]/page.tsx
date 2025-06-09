"use client";

import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default function PostPage(props: Params) {
  const { language } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    const getParams = async () => {
      const params = await props.params;
      setSlug(params.slug);
    };
    getParams();
  }, [props.params]);

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

  if (loading) {
    return (
      <main>
        <Container>
          <Header />
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
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}
