# Contributing to OS_our-links

## Development Setup

```bash
bun install
bun dev
```

## Build & Deploy

The project deploys automatically to GitHub Pages on push to `main`.

```bash
bun run build  # Creates static export in ./out
```

## Important Guidelines

### Static Assets Placement

**Never place static assets (SVG, PNG, ICO, etc.) directly in the `src/app/` directory.**

Next.js 16+ with Turbopack has a known bug where it attempts to process static files in `src/app/` as React components, causing build crashes with errors like:

```
thread 'tokio-runtime-worker' panicked at turbo-tasks-backend:
Dependency tracking is disabled so invalidation is not allowed
FATAL: An unexpected Turbopack error occurred
```

#### Where to Put Static Assets

| Asset Type | Correct Location | Example |
|------------|-----------------|---------|
| Favicons | `public/` | `public/favicon.ico`, `public/icon.svg` |
| Images | `public/` or `public/images/` | `public/images/hero.png` |
| Static files | `public/` | `public/robots.txt` |

#### How to Reference Assets

Since this project uses a `basePath` for GitHub Pages, reference assets with the basePath prefix:

```tsx
// In layout.tsx metadata
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/OS_our-links/favicon.ico' },
      { url: '/OS_our-links/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/OS_our-links/apple-touch-icon.png',
  },
}
```

### Pre-Push Checklist

Before pushing to `main`:

1. Run `bun run build` locally to verify the build succeeds
2. Check that all static assets are in `public/`, not `src/app/`
3. Verify favicon/image references include the basePath prefix

## Troubleshooting

### Build Fails with Turbopack Error

If you see a Turbopack "dependency tracking" error:

1. Check for any `.svg`, `.png`, `.ico` files in `src/app/`
2. Move them to `public/`
3. Update any metadata references to use the basePath prefix

### GitHub Actions Runner Not Available

Occasionally GitHub Actions shows "job was not acquired by Runner" errors. This is a GitHub infrastructure issue - simply re-run the workflow from the Actions tab.
