# Linktree Alternative

A beautiful, customizable link portal template built with Next.js 16, React 19, and Tailwind CSS 4. Features smooth animations, responsive design, and an optional CRT terminal background effect.

## Features

- **Single Configuration File** - All content managed through `site.config.ts`
- **Responsive Design** - Looks great on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion and GSAP powered interactions
- **CRT Terminal Effect** - Optional WebGL background effect (toggleable)
- **RSS Blog Integration** - Pull recent posts from any RSS feed
- **Dark Mode Ready** - Full light/dark theme support
- **Static Export** - Deploy anywhere (GitHub Pages, Vercel, Netlify)
- **Free Fonts** - Uses Inter and JetBrains Mono from Google Fonts

## Documentation

See the [full customization guide](docs/README.md) for detailed documentation on each section of the page, including example AI prompts for quick customization.

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

## Design Resources

Looking for components, icons, or design inspiration? Here are some curated resources:

- **[Open Session Design Directory](https://design-directory-blue.vercel.app/)** — Curated design resources, tools, and inspiration
- **[React Bits](https://www.reactbits.dev/)** — Animated components and micro-interactions for React
- **[Untitled UI](https://www.untitledui.com/)** — Icons, design system foundations, and UI components
- **[Simple Icons](https://simpleicons.org/)** — Free SVG icons for popular brands (great for tool icons)
- **[Realtime Colors](https://www.realtimecolors.com/)** — Visualize your color palette on a real site
- **[Coolors](https://coolors.co/)** — Color palette generator

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

- **Framework**: Next.js 16 (App Router)
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

## Troubleshooting

### Images don't appear

- **Check the path** — Image paths must start with `/` (e.g., `/images/logo.svg`, not `images/logo.svg`)
- **Verify the file exists** — Make sure the file is in the `public/` folder at the exact path you specified
- **Check file extension** — Ensure the extension in your config matches the actual file (`.svg` vs `.png`)

### Blog posts won't load

- **RSS feed must be public** — The feed URL needs to be accessible without authentication
- **Check the URL** — Visit your `feedUrl` directly in a browser to verify it returns XML
- **CORS issues** — Some feeds block cross-origin requests; try a different RSS source or use a proxy

### Deploy looks broken on GitHub Pages

- **basePath configuration** — Update `basePath` in `next.config.ts` to match your repository name:
  ```javascript
  basePath: "/your-repo-name",
  ```
- **Update getBasePath()** — Also update the helper function in `site.config.ts` to return the same value
- **Clear cache** — Try a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Icons or images are blurry

- **Use SVG when possible** — SVG files scale perfectly at any size
- **Increase resolution** — For PNG/JPEG, use at least 2x the display size (e.g., 200x200px for a 100x100px display)
- **Check compression** — Some compression tools reduce quality too aggressively

### Accent color changes don't apply everywhere

- **Update both locations** — Change `theme.accentColor` in `site.config.ts` AND the brand color scale in `src/app/theme.css`
- **Full color scale needed** — The CSS uses multiple shades (brand-50 through brand-900); update them all for consistency
- **Use a palette generator** — Tools like [Coolors](https://coolors.co/) or [Realtime Colors](https://www.realtimecolors.com/) can generate a full scale

### Development server won't start

- **Port in use** — Another app may be using port 3000. Try `npm run dev -- -p 3001`
- **Node version** — Ensure you're using Node.js 18 or higher (`node --version`)
- **Clear cache** — Delete `.next` folder and `node_modules`, then run `npm install` again

### Still stuck?

- Check the [section-specific documentation](docs/README.md) for detailed guides
- Each doc includes AI prompts you can copy-paste to get help with changes

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with Next.js, Tailwind CSS, Framer Motion, and GSAP.
