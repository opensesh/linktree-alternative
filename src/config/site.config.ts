/**
 * Site Configuration
 *
 * This file contains all customizable content for your link portal.
 * Edit the values below to personalize your site.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  title: string;
  handle: string;
  url: string;
  /** Icon type: "github" | "twitter" | "instagram" | "linkedin" | "youtube" | "tiktok" | "substack" | "medium" | "figma" | "dribbble" | "custom" */
  icon: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  badge: "live" | "coming-soon";
  link: string;
  buttonLabel: string;
  /** Path to default image/video */
  mediaDefault: string;
  /** Type of default media */
  mediaType: "image" | "video";
  /** Path to hover image */
  imageHover: string;
}

export interface TagData {
  label: string;
  bg: string;
  text: string;
}

export interface Tool {
  id: string;
  name: string;
  /** Path to icon (PNG recommended, 100x100 or larger) */
  icon: string;
  url: string;
  description: string;
  tags: TagData[];
  /** Set to true for smaller icons (optional) */
  smallIcon?: boolean;
}

export interface SiteConfig {
  metadata: {
    title: string;
    description: string;
    /** Path to favicon (relative to /public) */
    favicon: string;
  };
  analytics: {
    /** Google Analytics Measurement ID (leave empty to disable) */
    googleAnalyticsId: string;
  };
  branding: {
    /** Path to logo image (relative to basePath, or null to hide) */
    logo: string | null;
    /** Alt text for logo */
    logoAlt: string;
    /** Main website URL (linked from globe icon) */
    websiteUrl: string;
    /** Tagline displayed in footer */
    tagline: string;
    /** Contact email displayed in footer */
    email: string;
    /** Copyright year(s) */
    copyrightYear: string;
  };
  features: {
    /** Enable the CRT terminal background effect */
    crtEffect: boolean;
    /** CRT effect tint color (hex) */
    crtTint: string;
    /** CRT effect brightness (0-1) */
    crtBrightness: number;
    /** Enable the subscribe modal for resources */
    subscribeModal: boolean;
  };
  theme: {
    /** Primary accent color (hex) - used for CTAs, links, badges */
    accentColor: string;
    /** Dark background color (hex) */
    darkBg: string;
    /** Light background color (hex) */
    lightBg: string;
  };
  /** Navigation items shown in expandable header menu */
  nav: NavItem[];
  /** Social media links (max 5 recommended) */
  socialLinks: SocialLink[];
  /** Featured resources/projects (max 3 recommended) */
  resources: Resource[];
  /** Tools/tech stack items (16 slots, placeholder icons if needed) */
  tools: Tool[];
  blog: {
    /** Enable the blog section */
    enabled: boolean;
    /** RSS feed URL (e.g., Substack, Medium, or any RSS feed) */
    feedUrl: string;
    /** Section title */
    title: string;
    /** Substack subscribe URL (for newsletter form, leave empty to hide) */
    subscribeUrl: string;
  };
}

// ============================================
// CONFIGURATION
// ============================================

// Common tag styles for reuse
const COMMON_TAG_STYLES = { bg: "#f5f5f5", text: "#414651" };

// Category colors for primary tags (accessible with white text)
const CATEGORY_COLORS = {
  Productivity: "#5326ab",
  Design: "#e64400",
  Coding: "#007acc",
  Content: "#158f4a",
};

export const siteConfig: SiteConfig = {
  // ============================================
  // METADATA
  // ============================================
  metadata: {
    title: "Your Name | Links",
    description: "All my important links in one place",
    favicon: "/favicon.png",
  },

  // ============================================
  // ANALYTICS
  // ============================================
  analytics: {
    // Leave empty to disable Google Analytics
    googleAnalyticsId: "",
  },

  // ============================================
  // BRANDING
  // ============================================
  branding: {
    // Set to null to hide logo, or provide path like "/images/logo.svg"
    logo: "/images/logo-placeholder.svg",
    logoAlt: "Your Brand",
    websiteUrl: "https://example.com",
    tagline: "Your tagline goes here.\nBring bold ideas to life.",
    email: "hello@example.com",
    copyrightYear: "2024",
  },

  // ============================================
  // FEATURES
  // ============================================
  features: {
    // Toggle the animated CRT terminal background
    crtEffect: true,
    crtTint: "#FFFAEE",
    crtBrightness: 0.08,
    // Show subscribe modal before opening resources
    subscribeModal: false,
  },

  // ============================================
  // THEME COLORS
  // ============================================
  theme: {
    // Primary accent color (used for buttons, links, highlights)
    accentColor: "#3b82f6", // Blue - change to your brand color
    // Dark mode background
    darkBg: "#191919",
    // Light mode background
    lightBg: "#FFFAEE",
  },

  // ============================================
  // NAVIGATION
  // ============================================
  nav: [
    { id: "about", label: "About", href: "#" },
    { id: "projects", label: "Projects", href: "#" },
    { id: "contact", label: "Contact", href: "#" },
  ],

  // ============================================
  // SOCIAL LINKS
  // ============================================
  socialLinks: [
    {
      id: "figma",
      platform: "figma",
      title: "Figma",
      handle: "@opensession",
      url: "https://link.opensession.co/website-figma",
      icon: "figma",
    },
    {
      id: "github",
      platform: "github",
      title: "Github",
      handle: "@opensesh",
      url: "https://link.opensession.co/website-github",
      icon: "github",
    },
    {
      id: "substack",
      platform: "substack",
      title: "Substack",
      handle: "@opensession",
      url: "https://link.opensession.co/website-substack",
      icon: "substack",
    },
    {
      id: "instagram",
      platform: "instagram",
      title: "Insta",
      handle: "@opensession.co",
      url: "https://link.opensession.co/website-instagram",
      icon: "instagram",
    },
    {
      id: "medium",
      platform: "medium",
      title: "Medium",
      handle: "@opensession",
      url: "https://link.opensession.co/website-medium",
      icon: "medium",
    },
  ],

  // ============================================
  // RESOURCES / PROJECTS
  // ============================================
  resources: [
    {
      id: "project-1",
      title: "Your First Project",
      description:
        "A brief description of your first project or resource. Keep it concise and compelling.",
      badge: "live",
      link: "https://example.com/project-1",
      buttonLabel: "View Project",
      mediaDefault: "/images/placeholder-resource-01.svg",
      mediaType: "image",
      imageHover: "/images/placeholder-resource-02.svg",
    },
    {
      id: "project-2",
      title: "Your Second Project",
      description:
        "Another amazing project you want to showcase. Add a compelling description here.",
      badge: "live",
      link: "https://example.com/project-2",
      buttonLabel: "Learn More",
      mediaDefault: "/images/placeholder-resource-02.svg",
      mediaType: "image",
      imageHover: "/images/placeholder-resource-01.svg",
    },
    {
      id: "project-3",
      title: "Coming Soon Project",
      description:
        "Something exciting you're working on. Build anticipation with a teaser description.",
      badge: "coming-soon",
      link: "#",
      buttonLabel: "Stay Tuned",
      mediaDefault: "/images/placeholder-resource-01.svg",
      mediaType: "image",
      imageHover: "/images/placeholder-resource-02.svg",
    },
  ],

  // ============================================
  // TOOLS / TECH STACK
  // ============================================
  tools: [
    {
      id: "tool-1",
      name: "Tool One",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Description of how you use this tool in your workflow.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Category", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-2",
      name: "Tool Two",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Another tool you love using. Explain why it's valuable.",
      tags: [
        { label: "Design", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "UI/UX", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-3",
      name: "Tool Three",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "A coding tool or IDE you can't live without.",
      tags: [
        { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Editor", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-4",
      name: "Tool Four",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Content creation tool for videos, images, or audio.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Video", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-5",
      name: "Tool Five",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Another productivity tool in your arsenal.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Notes", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-6",
      name: "Tool Six",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "A design tool for creating beautiful interfaces.",
      tags: [
        { label: "Design", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "Prototyping", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-7",
      name: "Tool Seven",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Version control or collaboration tool.",
      tags: [
        { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Git", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-8",
      name: "Tool Eight",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Your default selected tool (shown on page load).",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Favorite", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-9",
      name: "Tool Nine",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "AI assistant or automation tool.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "AI", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-10",
      name: "Tool Ten",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Browser or research tool.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Browser", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-11",
      name: "Tool Eleven",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Video editing software.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Video", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-12",
      name: "Tool Twelve",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Motion graphics or animation tool.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Motion", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-13",
      name: "Tool Thirteen",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Photo editing or color grading.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Photo", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-14",
      name: "Tool Fourteen",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "AI image or video generation.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "AI", ...COMMON_TAG_STYLES },
      ],
      smallIcon: true,
    },
    {
      id: "tool-15",
      name: "Tool Fifteen",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "Screen recording or sharing utility.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Utility", ...COMMON_TAG_STYLES },
      ],
      smallIcon: true,
    },
    {
      id: "tool-16",
      name: "Tool Sixteen",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "AI art generation tool.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "AI Art", ...COMMON_TAG_STYLES },
      ],
      smallIcon: true,
    },
  ],

  // ============================================
  // BLOG / RSS FEED
  // ============================================
  blog: {
    enabled: true,
    feedUrl: "https://opensession.substack.com/feed",
    title: "Recent Blogs",
    subscribeUrl: "https://opensession.substack.com",
  },
};

// ============================================
// HELPER EXPORTS
// ============================================

/** Get the base path for assets (used in components) */
export const getBasePath = () => {
  // In development or when basePath is not set, return empty string
  // In production with GitHub Pages, this should match next.config.ts basePath
  return process.env.NODE_ENV === "production" ? "/linktree-alternative" : "";
};

/** Prepend base path to asset URLs */
export const withBasePath = (path: string) => {
  const basePath = getBasePath();
  // If path already starts with basePath or is external URL, return as-is
  if (path.startsWith(basePath) || path.startsWith("http")) {
    return path;
  }
  return `${basePath}${path}`;
};
