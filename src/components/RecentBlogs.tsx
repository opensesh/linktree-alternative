"use client";

// ============================================
// BLOG SECTION - STATIC PLACEHOLDER
// ============================================
// This component shows a static placeholder card.
//
// To connect your own RSS feed (Substack, Medium, etc.):
// 1. Update `blog.feedUrl` in src/config/site.config.ts with your RSS URL
// 2. Optionally set `blog.subscribeUrl` for a newsletter signup form
// 3. Replace this file with the dynamic version from:
//    docs/BLOG_RSS_SETUP.md
// ============================================

import { siteConfig } from "@/config/site.config";

export function RecentBlogs() {
  const { blog } = siteConfig;

  if (!blog.enabled) {
    return null;
  }

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
          {/* Static placeholder blog card */}
          <a
            href="#"
            className="blog-card group flex gap-3 sm:gap-4"
          >
            {/* Color fill square */}
            <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-[#2a2a2a]" />

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <h4 className="blog-card-title font-accent font-bold text-[var(--color-vanilla)] line-clamp-2 leading-tight">
                Your Blog Post Title
              </h4>
              <div className="flex flex-wrap items-center gap-x-2 text-[var(--fg-quaternary)]">
                <span className="blog-card-author">by Author Name</span>
                <span className="text-[var(--fg-tertiary)]">&bull;</span>
                <span className="blog-card-date">Jan 1, 2025</span>
              </div>
              <p className="blog-card-description text-[var(--fg-secondary)] line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </a>
        </div>

        {/* Placeholder subscribe form */}
        <div className="mt-6">
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="subscribe-input"
            />
            <button type="button" className="subscribe-button">
              Subscribe
            </button>
          </form>
          <p className="subscribe-hint">
            Get the latest posts delivered to your inbox
          </p>
        </div>
      </div>
    </section>
  );
}
