# Recent Blogs

<!-- AI_CONTEXT
Component: src/components/RecentBlogs.tsx
Config: siteConfig.blog (enabled, feedUrl, title, subscribeUrl)
CSS: src/app/globals.css (classes: .blog-card, .blog-card-title, .blog-card-author, .blog-card-date, .blog-card-description, .subscribe-form, .subscribe-input, .subscribe-button, .subscribe-hint)
Assets: None (blog images come from the RSS feed)
Constraints: The default component is a static placeholder. To show live posts from an RSS feed, replace the component file with the dynamic version below. Uses rss2json.com API (no API key needed for basic usage). Subscribe form is hardcoded to Substack's API endpoint.
-->

> **Component:** `src/components/RecentBlogs.tsx`
> **Config:** `siteConfig.blog`

## What This Section Does

The Recent Blogs section shows blog post cards with a thumbnail, title, author, date, and description. It has two modes:

1. **Static placeholder** (default) — Ships with the template, shows a single dummy card and a non-functional subscribe form. No external API calls.
2. **Dynamic RSS** — Fetches up to 3 recent posts from any RSS feed and optionally shows a working newsletter subscribe form. Requires replacing the component file (see below).

The section can be disabled entirely by setting `blog.enabled` to `false`.

## File Map

| File | Purpose |
|------|---------|
| `src/components/RecentBlogs.tsx` | Blog section component (static placeholder by default) |
| `src/config/site.config.ts` | `blog` config object |
| `src/app/globals.css` | `.blog-card`, `.subscribe-form`, `.subscribe-input`, `.subscribe-button` styles |

## Configuration

```ts
blog: {
  enabled: boolean;      // Show or hide the entire section
  feedUrl: string;       // RSS feed URL (used by the dynamic component)
  title: string;         // Section heading (e.g., "Recent Blogs")
  subscribeUrl: string;  // Substack URL for newsletter form (leave empty to hide)
}
```

### Default values

```ts
blog: {
  enabled: true,
  feedUrl: "",
  title: "Recent Blogs",
  subscribeUrl: "",
}
```

## How to Connect Your Blog (Substack Example)

This walkthrough uses Substack since it's one of the most common setups. At Open Session, we use Substack for our blog and newsletter.

### Step 1: Update the config

In `src/config/site.config.ts`, set your blog details:

```ts
blog: {
  enabled: true,
  feedUrl: "https://yourblog.substack.com/feed",
  title: "Recent Blogs",
  subscribeUrl: "https://yourblog.substack.com",
}
```

### Step 2: Replace the component

Copy the entire **Dynamic RecentBlogs Component** section below and replace the contents of `src/components/RecentBlogs.tsx` with it.

### Step 3: Done

The component will fetch your 3 most recent Substack posts and display them. If `subscribeUrl` is set, a newsletter signup form appears below the posts. The form submits directly to Substack's free subscription endpoint — no additional setup needed.

## Other RSS Sources

| Platform | Feed URL format |
|----------|----------------|
| **Substack** | `https://yourblog.substack.com/feed` |
| **Medium** | `https://medium.com/feed/@yourusername` |
| **WordPress** | `https://yourblog.com/feed` |
| **Ghost** | `https://yourblog.com/rss/` |
| **Any RSS 2.0 / Atom** | The feed's direct URL |

> **Note:** The dynamic component uses the [rss2json.com](https://rss2json.com) API to fetch RSS feeds in a CORS-friendly way. No API key is required for basic usage.

## Subscribe Form

The subscribe form posts to `{subscribeUrl}/api/v1/free?nojs=true`, which is Substack's free subscription endpoint. If you use a different newsletter provider:

1. Open `src/components/RecentBlogs.tsx` (after replacing with the dynamic version)
2. Find the `<form>` tag with the `action` attribute
3. Change the `action` URL to your provider's subscribe endpoint

## How to Customize

1. **Connect an RSS feed** — Follow the Substack example above, substituting your feed URL.
2. **Disable the blog section** — Set `blog.enabled` to `false` in the config.
3. **Change the section title** — Update `blog.title` (e.g., `"Latest Articles"`, `"From the Blog"`).
4. **Hide the subscribe form** — Leave `blog.subscribeUrl` as an empty string `""`.
5. **Change the number of posts shown** — In the dynamic component, find `.slice(0, 3)` and change `3` to your desired count.

## Example AI Prompts

Copy-paste these to an AI assistant to customize this section:

> **Config + Component** — "Connect my Substack blog at myblog.substack.com to the Recent Blogs section. Replace the static placeholder component with the dynamic RSS version from the docs, set the feed URL, and enable the subscribe form."

> **Config-only** — "Disable the blog section entirely by setting blog.enabled to false."

> **Config-only** — "Change the blog section title from 'Recent Blogs' to 'Latest Articles'."

> **Config + Component** — "Set up the dynamic RSS component with my Medium feed at https://medium.com/feed/@myuser. Don't show the subscribe form."

> **Component edit** — "Change the blog section to show 5 recent posts instead of 3."

## Dynamic RecentBlogs Component

Replace the contents of `src/components/RecentBlogs.tsx` with the following:

```tsx
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
        {/* Title */}
        <h4 className="blog-card-title font-accent font-bold text-[var(--color-vanilla)] line-clamp-2 leading-tight">
          {post.title}
        </h4>

        {/* Author + Date */}
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

  if (!blog.enabled) {
    return null;
  }

  useEffect(() => {
    async function loadPosts() {
      try {
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

  if (error || (!isLoading && posts.length === 0)) {
    return null;
  }

  const hasSubscribeForm = blog.subscribeUrl && blog.subscribeUrl.length > 0;

  return (
    <section className="w-full mt-6 sm:mt-8">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        <h2
          className="text-xl font-bold mb-3 sm:mb-4"
          style={{ color: "var(--color-vanilla)" }}
        >
          {blog.title}
        </h2>

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
```

---

*[Back to index](README.md)*
