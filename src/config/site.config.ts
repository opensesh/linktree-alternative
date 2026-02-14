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
      id: "claude",
      name: "Claude",
      icon: "/icons/tech/command/claude.png",
      url: "https://claude.ai",
      description: "Go-to AI assistant for coding, writing, and research.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "AI", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "cursor",
      name: "Cursor",
      icon: "/icons/tech/command/cursor.png",
      url: "https://cursor.com",
      description: "Primary IDE with AI-powered code completion.",
      tags: [
        { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "IDE", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "github",
      name: "GitHub",
      icon: "/icons/tech/command/github.png",
      url: "https://github.com",
      description: "Version control and collaboration platform.",
      tags: [
        { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Git", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "figma",
      name: "Figma",
      icon: "/icons/tech/command/figma.png",
      url: "https://figma.com",
      description: "Design system canvas for UI/UX work.",
      tags: [
        { label: "Design", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "UI", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "framer",
      name: "Framer",
      icon: "/icons/tech/command/framer.png",
      url: "https://framer.com",
      description: "Interactive websites without code.",
      tags: [
        { label: "Design", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "No-Code", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "notion",
      name: "Notion",
      icon: "/icons/tech/command/notion.png",
      url: "https://notion.so",
      description: "All-in-one workspace for notes and docs.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Notes", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "wispr",
      name: "Wispr Flow",
      icon: "/icons/tech/command/wispr.png",
      url: "https://wispr.ai",
      description: "Voice dictation for fast text input.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Voice", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "obsidian",
      name: "Obsidian",
      icon: "/icons/tech/command/obsidian.png",
      url: "https://obsidian.md",
      description: "Markdown viewer and knowledge base.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Markdown", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "comet",
      name: "Comet",
      icon: "/icons/tech/command/comet.png",
      url: "https://comet.co",
      description: "AI browser by Perplexity for research.",
      tags: [
        { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "AI", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "conductor",
      name: "Conductor",
      icon: "/icons/tech/command/conductor.png",
      url: "https://conductor.ai",
      description: "Multi-agent AI workflows.",
      tags: [
        { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "AI", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "premiere",
      name: "Premiere Pro",
      icon: "/icons/tech/command/premiere.png",
      url: "https://adobe.com/products/premiere",
      description: "Professional video editing software.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Video", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "aftereffects",
      name: "After Effects",
      icon: "/icons/tech/command/aftereffects.png",
      url: "https://adobe.com/products/aftereffects",
      description: "Motion graphics and visual effects.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Motion", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "lightroom",
      name: "Lightroom",
      icon: "/icons/tech/command/lightroom.png",
      url: "https://adobe.com/products/lightroom",
      description: "Photo editing and color grading.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Photo", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "runway",
      name: "Runway",
      icon: "/icons/tech/command/runway.png",
      url: "https://runway.ml",
      description: "AI video generation and editing.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "AI Video", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "openscreen",
      name: "Open Screen",
      icon: "/icons/tech/command/openscreen.png",
      url: "https://openscreen.studio",
      description: "Screen recording utility.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Utility", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "midjourney",
      name: "Midjourney",
      icon: "/icons/tech/command/midjourney.png",
      url: "https://midjourney.com",
      description: "AI image generation for creative work.",
      tags: [
        { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "AI Art", ...COMMON_TAG_STYLES },
      ],
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
