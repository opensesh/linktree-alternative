"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  imageUrl: string | null;
  link: string;
}

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  enclosure?: { link: string };
}

interface RssResponse {
  status: string;
  items: RssItem[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-card group flex gap-3 sm:gap-4"
    >
      {/* Image */}
      <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-[#2a2a2a]">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--fg-quaternary)]">
            <span className="text-xl font-bold font-accent">Blog</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        {/* Title - full width */}
        <h4 className="blog-card-title font-accent font-bold text-[var(--color-vanilla)] line-clamp-2 leading-tight">
          {post.title}
        </h4>

        {/* Author + Date - same line, wraps on mobile */}
        <div className="flex flex-wrap items-center gap-x-2 text-[var(--fg-quaternary)]">
          <span className="blog-card-author">by {post.author}</span>
          <span className="text-[var(--fg-tertiary)]">•</span>
          <span className="blog-card-date">{post.date}</span>
        </div>

        {/* Description */}
        <p className="blog-card-description text-[var(--fg-secondary)] line-clamp-3">
          {post.description}
        </p>
      </div>
    </a>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="blog-card flex gap-3 sm:gap-4">
      <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-[#2a2a2a] animate-pulse" />
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="h-4 w-3/4 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-3 w-24 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
      </div>
    </div>
  );
}

export function RecentBlogs() {
  const { blog } = siteConfig;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Don't render if blog is disabled
  if (!blog.enabled) {
    return null;
  }

  useEffect(() => {
    async function loadPosts() {
      try {
        // Use rss2json.com API for CORS-friendly RSS fetching
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blog.feedUrl)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: RssResponse = await response.json();

        if (data.status !== "ok" || !data.items) {
          throw new Error("Invalid response");
        }

        const parsedPosts: BlogPost[] = data.items.slice(0, 3).map((item, index) => ({
          id: `blog-${index}-${new Date(item.pubDate).getTime()}`,
          title: item.title,
          description:
            stripHtml(item.description).slice(0, 200) +
            (item.description.length > 200 ? "..." : ""),
          date: formatDate(item.pubDate),
          author: item.author || "Author",
          imageUrl: item.thumbnail || item.enclosure?.link || null,
          link: item.link,
        }));

        setPosts(parsedPosts);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, [blog.feedUrl]);

  // Don't render if error or no posts
  if (error || (!isLoading && posts.length === 0)) {
    return null;
  }

  const hasSubscribeForm = blog.subscribeUrl && blog.subscribeUrl.length > 0;

  return (
    <section className="w-full mt-6 sm:mt-8">
      {/* Container with max-width */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Heading */}
        <h2
          className="text-xl font-bold mb-3 sm:mb-4"
          style={{ color: "var(--color-vanilla)" }}
        >
          {blog.title}
        </h2>

        {/* Blog cards - vertical stack */}
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>

        {/* Subscribe form - only if subscribeUrl is set */}
        {hasSubscribeForm && (
          <div className="mt-6">
            <form
              action={`${blog.subscribeUrl}/api/v1/free?nojs=true`}
              method="post"
              className="subscribe-form"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="subscribe-input"
              />
              <button type="submit" className="subscribe-button">
                Subscribe
              </button>
            </form>
            <p className="subscribe-hint">
              Get the latest posts delivered to your inbox
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
