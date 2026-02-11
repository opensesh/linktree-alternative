# Our Links

A free, open-source alternative to Linktree built with Next.js 16 and React 19.

This is [Open Session's](https://opensession.co) link portal—a single page showcasing our social links, resources, blog posts, and tech stack. Instead of paying $10-50/month for Linktree Pro, Beacons.ai, or similar services, we built our own and made it open source so you can too.

## Why Build Your Own?

- **Save $200-500/year** vs paid link-in-bio services
- **Full customization** - no template constraints
- **Own your data** - no third-party analytics tracking you
- **Learn modern web dev** - or let AI tools like Claude Code or Cursor build it for you

## Features

- Responsive link cards with hover effects
- Blog feed from Substack RSS (auto-updates)
- Email subscription integration
- Tech stack carousel
- Expandable navigation with smooth animations
- WebGL background effect
- Dark mode optimized
- Mobile-first design

## Quick Start

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/our-links.git
cd our-links
```

### 2. Install Dependencies

```bash
bun install
# or npm install
```

### 3. Run Development Server

```bash
bun dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 4. Customize

Edit the following files to make it yours:

| File | What to Change |
|------|----------------|
| `src/components/OurLinks.tsx` | Your social media links |
| `src/components/FreeResources.tsx` | Your resources/projects |
| `src/components/TechStack.tsx` | Your tools and tech |
| `src/components/CardNav.tsx` | Navigation links and branding |
| `src/components/RecentBlogs.tsx` | Your Substack RSS URL (or remove section) |
| `src/app/layout.tsx` | Analytics tracking ID |
| `src/app/theme.css` | Brand colors |
| `public/` | Your logos, images, fonts |

### 5. Deploy

**GitHub Pages (Free)**

This project is configured for GitHub Pages out of the box:

1. Push to GitHub
2. Go to Settings → Pages → Source → GitHub Actions
3. The site deploys automatically on every push to `main`

**Vercel (Also Free)**

Deploy to [Vercel](https://vercel.com) with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/opensesh/our-links)

Note: For Vercel, remove `output: "export"` from `next.config.ts` to enable server features.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **UI**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com)
- **Icons**: [Lucide](https://lucide.dev)
- **Background**: [OGL](https://oframe.github.io/ogl/) (WebGL)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + analytics
│   ├── page.tsx            # Home page
│   ├── globals.css         # Component styles
│   └── theme.css           # Color tokens
└── components/
    ├── CardNav.tsx         # Header navigation
    ├── OurLinks.tsx        # Social link cards
    ├── FreeResources.tsx   # Resource showcase
    ├── RecentBlogs.tsx     # Blog feed (fetches RSS client-side)
    ├── TechStack.tsx       # Tool carousel
    ├── SubscribeModal.tsx  # Email capture
    └── FaultyTerminal.tsx  # WebGL background
```

## Commands

```bash
bun dev          # Start dev server
bun run build    # Production build
bun run lint     # Run ESLint
bun start        # Start production server
```

## License

MIT — use it however you want.

---

Built by [Open Session](https://opensession.co). Made with Claude Code.
