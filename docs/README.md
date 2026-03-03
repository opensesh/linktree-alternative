# Customization Guide

<!-- AI_CONTEXT
This is the documentation index for a Linktree alternative template.
Config file: src/config/site.config.ts (single source of truth for all content)
Main page: src/app/page.tsx (composes all sections top-to-bottom)
Assets: public/images/ (logos, resource images), public/icons/tech/command/ (tool icons)
Styling: src/app/theme.css (color tokens), src/app/globals.css (component classes), src/lib/brand-styles/ (brand CSS)
-->

This guide covers every section of the link portal, how it works, and how to customize it for your own brand. Each doc includes example AI prompts you can copy-paste to have an assistant make the changes for you.

## Architecture

- **Single config file:** All content lives in [`src/config/site.config.ts`](../src/config/site.config.ts). Most customizations only require editing this one file.
- **Component-per-section:** Each page section is a standalone React component in `src/components/`.
- **Static export:** The site builds to static HTML via Next.js 16, deployable anywhere (GitHub Pages, Vercel, Netlify).

## Section Map

The page renders these sections top-to-bottom:

| # | Section | Component | Config Key | Doc |
|---|---------|-----------|------------|-----|
| 1 | Card Nav | `src/components/CardNav.tsx` | `nav`, `branding` | [01-card-nav.md](01-card-nav.md) |
| 2 | Social Links | `src/components/OurLinks.tsx` | `socialLinks` | [02-social-links.md](02-social-links.md) |
| 3 | Resource Cards | `src/components/FreeResources.tsx` | `resources`, `features` | [03-resource-cards.md](03-resource-cards.md) |
| 4 | Recent Blogs | `src/components/RecentBlogs.tsx` | `blog` | [04-recent-blogs.md](04-recent-blogs.md) |
| 5 | Tools | `src/components/TechStack.tsx` | `tools` | [05-tools.md](05-tools.md) |
| 6 | Footer | `src/components/Footer.tsx` | `branding` | [06-footer.md](06-footer.md) |

## Asset Directories

| Directory | Contents |
|-----------|----------|
| `public/images/` | Logo, resource card images |
| `public/icons/tech/command/` | Tool icons (PNG, 100x100+) |
| `public/` | Favicon |

## For AI Assistants

When a user asks you to customize this template:

1. **Read** `src/config/site.config.ts` first — it's the single source of truth for all content.
2. **Read** the relevant section doc (`docs/0X-*.md`) to understand constraints, supported options, and file locations.
3. **Most changes are config-only.** Edit the arrays/objects in `site.config.ts` — components pull from it automatically.
4. **Asset changes** (logos, icons, images) go in `public/` at the paths referenced in the config.
5. **Component edits** are only needed for layout changes, hardcoded text, or the dynamic blog component swap.

## Other Resources

- [README.md](../README.md) — Quick start, deployment, and commands
