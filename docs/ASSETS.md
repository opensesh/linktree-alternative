# Asset Preparation Guide

This guide covers the images, logos, and icons you'll need to prepare before customizing your link portal.

---

## Overview

| Asset | Location | Format | Dimensions |
|-------|----------|--------|------------|
| Logo | `public/images/` | SVG (preferred) or PNG | 200x200px or larger |
| Favicon | `public/` | PNG or ICO | 32x32px minimum |
| Resource images | `public/images/` | JPEG, PNG, or SVG | 600x400px (3:2 ratio) |
| Tool icons | `public/icons/tech/` | PNG or SVG | 100x100px |

---

## Logo

Your logo appears in the header card at the top of the page.

### Recommendations

- **Format:** SVG is ideal (scales perfectly at any size). PNG works too.
- **Background:** Transparent background strongly recommended
- **Dimensions:** At least 200x200px if using PNG
- **File size:** Keep under 100KB for fast loading
- **Aspect ratio:** Square (1:1) or horizontal (up to 3:1) works best

### Where to place it

1. Save your logo to `public/images/` (e.g., `public/images/my-logo.svg`)
2. Update the path in `site.config.ts`:
   ```typescript
   branding: {
     logo: "/images/my-logo.svg",
     // ...
   }
   ```

### Creating a logo

If you don't have a logo yet:
- **[Canva](https://www.canva.com/)** — Free logo maker with templates
- **[Figma](https://www.figma.com/)** — Professional design tool (free tier available)
- **[Logomark](https://logomark.com/)** — AI-powered logo generator

---

## Favicon

The small icon that appears in browser tabs.

### Recommendations

- **Format:** PNG (widely supported) or ICO
- **Dimensions:** 32x32px minimum, 180x180px for Apple touch icon
- **Design:** Keep it simple — it's displayed very small
- **Background:** Transparent or solid color both work

### Where to place it

1. Save as `public/favicon.png` (or `.ico`)
2. Update in `site.config.ts` if using a different filename:
   ```typescript
   metadata: {
     favicon: "/favicon.png",
   }
   ```

### Generating favicons

- **[Favicon.io](https://favicon.io/)** — Generate from text, image, or emoji
- **[RealFaviconGenerator](https://realfavicongenerator.net/)** — Creates all sizes you need

---

## Resource Images

Images for your featured projects/resources in the card section.

### Recommendations

- **Format:** JPEG for photos, PNG for graphics with transparency, SVG for illustrations
- **Aspect ratio:** 3:2 (e.g., 600x400px) works best with the card layout
- **File size:** Optimize images to under 200KB each
- **Hover state:** Optionally provide a second image for hover effect

### Where to place them

1. Save images to `public/images/`
2. Reference in `site.config.ts`:
   ```typescript
   resources: [
     {
       mediaDefault: "/images/project-screenshot.png",
       imageHover: "/images/project-hover.png", // optional
       mediaType: "image",
       // ...
     }
   ]
   ```

### Image optimization tools

- **[Squoosh](https://squoosh.app/)** — Google's free image compressor (excellent quality)
- **[TinyPNG](https://tinypng.com/)** — PNG and JPEG compression
- **[SVGOMG](https://jakearchibald.github.io/svgomg/)** — SVG optimizer

### Creating project screenshots

- **[CleanShot X](https://cleanshot.com/)** (Mac) — Beautiful screenshots with shadows
- **[ShareX](https://getsharex.com/)** (Windows) — Free screenshot tool
- **[Shots.so](https://shots.so/)** — Create mockups from screenshots

---

## Tool Icons

Icons for your tech stack / tools carousel.

### Recommendations

- **Format:** PNG with transparent background, or SVG
- **Dimensions:** 100x100px minimum (displayed at ~48-64px)
- **Style:** Consistent style across all icons looks best
- **Color:** Monochrome or full color both work

### Where to place them

1. Save icons to `public/icons/tech/`
2. Reference in `site.config.ts`:
   ```typescript
   tools: [
     {
       name: "React",
       icon: "/icons/tech/react.svg",
       // ...
     }
   ]
   ```

### Finding tech/brand icons

- **[Simple Icons](https://simpleicons.org/)** — 3000+ brand SVG icons (free)
- **[DevIcons](https://devicon.dev/)** — Icons for programming languages and tools
- **[Skill Icons](https://skillicons.dev/)** — Styled icons for GitHub READMEs
- **[SVG Repo](https://www.svgrepo.com/)** — Large collection of free SVG icons

### Downloading from Simple Icons

1. Go to [simpleicons.org](https://simpleicons.org/)
2. Search for the brand (e.g., "Next.js")
3. Click the icon to download the SVG
4. Save to `public/icons/tech/nextjs.svg`

---

## File Naming Conventions

Use lowercase, hyphen-separated names for consistency:

```
✅ Good:
public/images/my-logo.svg
public/images/project-dashboard.png
public/icons/tech/next-js.svg

❌ Avoid:
public/images/MyLogo.svg
public/images/Project Dashboard.png
public/icons/tech/NextJS.SVG
```

---

## Quick Checklist

Before launching, make sure you have:

- [ ] Logo (SVG or high-res PNG, transparent background)
- [ ] Favicon (32x32px minimum)
- [ ] Resource images (one per featured project, 3:2 ratio)
- [ ] Tool icons (one per tool in your tech stack)

---

## Need Help?

- See the [Quick Start Guide](QUICK_START.md) for setup instructions
- Check [Design Resources](../README.md#design-resources) for more tools
- Review the [Troubleshooting section](../README.md#troubleshooting) if images don't appear
