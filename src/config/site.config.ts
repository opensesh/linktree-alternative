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
    logo: "/images/logo_wordmark_charcoal.svg",
    logoAlt: "Open Session",
    websiteUrl: "https://opensession.co",
    tagline: "Your tagline goes here.",
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
    accentColor: "#fe5102", // Aperol Orange - change to your brand color
    // Dark mode background
    darkBg: "#191919",
    // Light mode background
    lightBg: "#FFFAEE",
  },

  // ============================================
  // NAVIGATION
  // ============================================
  nav: [
    { id: "nav-1", label: "Insert", href: "#" },
    { id: "nav-2", label: "Insert", href: "#" },
    { id: "nav-3", label: "Insert", href: "#" },
  ],

  // ============================================
  // SOCIAL LINKS
  // ============================================
  socialLinks: [
    {
      id: "figma",
      platform: "figma",
      title: "Figma",
      handle: "@handle",
      url: "#",
      icon: "figma",
    },
    {
      id: "github",
      platform: "github",
      title: "Github",
      handle: "@handle",
      url: "#",
      icon: "github",
    },
    {
      id: "substack",
      platform: "substack",
      title: "Substack",
      handle: "@handle",
      url: "#",
      icon: "substack",
    },
    {
      id: "instagram",
      platform: "instagram",
      title: "Insta",
      handle: "@handle",
      url: "#",
      icon: "instagram",
    },
    {
      id: "medium",
      platform: "medium",
      title: "Medium",
      handle: "@handle",
      url: "#",
      icon: "medium",
    },
  ],

  // ============================================
  // RESOURCES / PROJECTS
  // ============================================
  resources: [
    {
      id: "project-1",
      title: "Insert title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      badge: "live",
      link: "https://example.com/project-1",
      buttonLabel: "Link",
    },
    {
      id: "project-2",
      title: "Insert title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      badge: "live",
      link: "https://example.com/project-2",
      buttonLabel: "Link",
    },
    {
      id: "project-3",
      title: "Insert title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      badge: "coming-soon",
      link: "#",
      buttonLabel: "Link",
    },
  ],

  // ============================================
  // TOOLS / TECH STACK
  // ============================================
  tools: [
    {
      id: "tool-1",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-2",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-3",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-4",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-5",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-6",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-7",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-8",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-9",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-10",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-11",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-12",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-13",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-14",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Coding, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-15",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Design, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
    {
      id: "tool-16",
      name: "Insert title",
      icon: "/icons/tech/command/placeholder.svg",
      url: "#",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: [
        { label: "Insert tag", bg: CATEGORY_COLORS.Content, text: "#fff" },
        { label: "Insert category tag", ...COMMON_TAG_STYLES },
      ],
    },
  ],

  // ============================================
  // BLOG / RSS FEED
  // ============================================
  blog: {
    enabled: true,
    // Add your RSS feed URL to fetch live blog posts (e.g., "https://yourblog.substack.com/feed")
    // See docs/04-recent-blogs.md for the dynamic RSS component
    feedUrl: "",
    title: "Recent Blogs",
    // Add your Substack URL to show a subscribe form (e.g., "https://yourblog.substack.com")
    subscribeUrl: "",
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
