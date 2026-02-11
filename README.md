# Linktree Alternative

A beautiful, customizable link portal template built with Next.js 15, React 19, and Tailwind CSS 4. Features smooth animations, responsive design, and an optional CRT terminal background effect.

## Features

- **Single Configuration File** - All content managed through `site.config.ts`
- **Responsive Design** - Looks great on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion and GSAP powered interactions
- **CRT Terminal Effect** - Optional WebGL background effect (toggleable)
- **RSS Blog Integration** - Pull recent posts from any RSS feed
- **Dark Mode Ready** - Full light/dark theme support
- **Static Export** - Deploy anywhere (GitHub Pages, Vercel, Netlify)
- **Free Fonts** - Uses Inter and JetBrains Mono from Google Fonts

## Quick Start

### 1. Clone or Fork

```bash
# Clone the repository
git clone https://github.com/yourusername/linktree-alternative.git
cd linktree-alternative

# Install dependencies
npm install
```

### 2. Configure Your Site

Edit `src/config/site.config.ts` to customize:

- **Metadata** - Title, description, favicon
- **Branding** - Logo, tagline, email, website URL
- **Navigation** - Header menu items
- **Social Links** - Up to 5 social media links
- **Resources** - Featured projects/resources (up to 3)
- **Tools** - Tech stack showcase (up to 16 items)
- **Blog** - RSS feed integration

### 3. Add Your Assets

Replace placeholder files in `/public`:
- `/images/logo-placeholder.svg` - Your logo
- `/icons/tech/placeholder.svg` - Your tool icons
- `/images/placeholder-resource-*.svg` - Your project images

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

### 5. Deploy

```bash
# Build for production
npm run build

# Preview the build
npm run start
```

## Configuration Reference

### `site.config.ts` Structure

```typescript
export const siteConfig = {
  // Site metadata for SEO
  metadata: {
    title: "Your Name | Links",
    description: "All my important links in one place",
    favicon: "/favicon.png",
  },

  // Google Analytics (leave empty to disable)
  analytics: {
    googleAnalyticsId: "",
  },

  // Branding
  branding: {
    logo: "/images/logo-placeholder.svg", // or null to hide
    logoAlt: "Your Brand",
    websiteUrl: "https://example.com",
    tagline: "Your tagline goes here.",
    email: "hello@example.com",
    copyrightYear: "2024",
  },

  // Feature toggles
  features: {
    crtEffect: true,      // Toggle CRT background
    crtTint: "#FFFAEE",   // CRT effect tint color
    crtBrightness: 0.08,  // CRT effect brightness
    subscribeModal: false, // Show modal before resources
  },

  // Theme colors
  theme: {
    accentColor: "#3b82f6", // Customize accent color
    darkBg: "#191919",
    lightBg: "#FFFAEE",
  },

  // Navigation items (shown in expandable header)
  nav: [
    { id: "about", label: "About", href: "#" },
    { id: "projects", label: "Projects", href: "#" },
    { id: "contact", label: "Contact", href: "#" },
  ],

  // Social links (max 5 recommended)
  socialLinks: [
    {
      id: "github",
      platform: "github",
      title: "GitHub",
      handle: "@yourusername",
      url: "https://github.com/yourusername",
      icon: "github",
    },
    // ... more links
  ],

  // Featured resources/projects (max 3)
  resources: [
    {
      id: "project-1",
      title: "Your Project",
      description: "Description here",
      badge: "live", // "live" or "coming-soon"
      link: "https://example.com",
      buttonLabel: "View Project",
      mediaDefault: "/images/placeholder-resource-01.svg",
      mediaType: "image", // "image" or "video"
      imageHover: "/images/placeholder-resource-02.svg",
    },
    // ... more resources
  ],

  // Tech stack / tools (up to 16)
  tools: [
    {
      id: "tool-1",
      name: "Tool Name",
      icon: "/icons/tech/placeholder.svg",
      url: "https://example.com",
      description: "What you use it for",
      tags: [
        { label: "Category", bg: "#5326ab", text: "#fff" },
      ],
    },
    // ... more tools
  ],

  // Blog section (RSS integration)
  blog: {
    enabled: true,
    feedUrl: "https://example.substack.com/feed",
    title: "Recent Posts",
    subscribeUrl: "", // Leave empty to hide newsletter form
  },
};
```

### Supported Social Icons

- `github`, `twitter`, `linkedin`, `instagram`, `youtube`
- `tiktok`, `substack`, `medium`, `figma`, `dribbble`
- `custom` (generic link icon)

## Customization

### Accent Color

To change the accent color throughout the site:

1. Update `theme.accentColor` in `site.config.ts`
2. Update the brand color scale in `src/app/theme.css`:

```css
/* Brand Scale - Customize for your brand */
--color-brand-25: #f5f8ff;
--color-brand-50: #eff6ff;
--color-brand-100: #dbeafe;
/* ... update all brand scale values */
--color-brand-500: #3b82f6;  /* Main accent */
/* ... */
```

### Fonts

The template uses Google Fonts (Inter + JetBrains Mono). To change fonts:

1. Update the `@import` in `src/lib/brand-styles/brand.css`
2. Update font-family references in `globals.css` and `brand.css`

### CRT Effect

Toggle the retro CRT terminal background:

```typescript
features: {
  crtEffect: true,      // Enable/disable
  crtTint: "#FFFAEE",   // Tint color
  crtBrightness: 0.08,  // Brightness (0-1)
}
```

## Deployment

### GitHub Pages

1. Update `basePath` in `next.config.ts`:
```javascript
basePath: "/your-repo-name",
```

2. Update `getBasePath()` in `site.config.ts` to match.

3. Build and deploy:
```bash
npm run build
# Upload /out folder to GitHub Pages
```

### Vercel

1. Remove or set `basePath` to empty string
2. Connect your GitHub repo to Vercel
3. Deploy automatically on push

### Netlify

1. Set build command: `npm run build`
2. Set publish directory: `out`
3. Deploy

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, GSAP
- **WebGL**: OGL (CRT effect)
- **Fonts**: Inter, JetBrains Mono (Google Fonts)

## Project Structure

```
linktree-alternative/
├── public/
│   ├── images/          # Logos, resource images
│   ├── icons/tech/      # Tool icons
│   └── favicon.png
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Main page
│   │   ├── globals.css  # Global styles
│   │   └── theme.css    # Theme colors
│   ├── components/
│   │   ├── CardNav.tsx      # Header navigation
│   │   ├── OurLinks.tsx     # Social links section
│   │   ├── FreeResources.tsx # Resources section
│   │   ├── TechStack.tsx    # Tools carousel
│   │   ├── RecentBlogs.tsx  # Blog posts section
│   │   └── Footer.tsx       # Footer
│   ├── config/
│   │   └── site.config.ts   # All configuration
│   └── lib/
│       └── brand-styles/    # Brand CSS
└── package.json
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with Next.js, Tailwind CSS, Framer Motion, and GSAP.
