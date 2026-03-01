# Resource Cards

<!-- AI_CONTEXT
Component: src/components/FreeResources.tsx, src/components/SubscribeModal.tsx
Config: siteConfig.resources (array of Resource), siteConfig.features.subscribeModal (boolean)
CSS: src/app/globals.css (classes: .resource-card, .resource-card-badge, .resource-card-title, .resource-card-description, .card-button, .badge-live, .badge-coming-soon, .subscribe-input, .subscribe-button)
Assets: public/images/ (resource card images — default and hover states)
Constraints: Max 3 resources recommended. Grid is 2 columns on desktop with the 3rd card spanning both. badge must be "live" or "coming-soon". mediaType must be "image" or "video". Subscribe modal uses siteConfig.blog.subscribeUrl for the Substack endpoint.
-->

> **Component:** `src/components/FreeResources.tsx`
> **Config:** `siteConfig.resources` and `siteConfig.features.subscribeModal`

## What This Section Does

The Resource Cards section displays up to 3 featured projects or resources in a responsive grid. On mobile it stacks vertically; on desktop the first two cards sit side by side and the third spans the full width. Each card has an image area with a badge overlay ("Live" or "Coming Soon"), a title, description, and a button. "Coming Soon" cards are not clickable. Optionally, a subscribe modal can gate access — requiring an email before opening the resource link.

## File Map

| File | Purpose |
|------|---------|
| `src/components/FreeResources.tsx` | Card grid layout, click handling, modal integration |
| `src/components/SubscribeModal.tsx` | Optional email gate modal (Framer Motion animated) |
| `src/config/site.config.ts` | `resources` array and `features.subscribeModal` toggle |
| `src/app/globals.css` | `.resource-card`, `.badge-live`, `.badge-coming-soon`, `.card-button` styles |
| `public/images/` | Card images (default and hover states) |

## Configuration

### Resource interface

```ts
interface Resource {
  id: string;           // Unique identifier
  title: string;        // Card heading
  description: string;  // Card description (truncated to 2-3 lines)
  badge: "live" | "coming-soon";  // Status badge
  link: string;         // URL opened on click (ignored for "coming-soon")
  buttonLabel: string;  // Button text (e.g., "Link", "View Project")
  mediaDefault: string; // Path to default image or video
  mediaType: "image" | "video";  // Media type for default state
  imageHover: string;   // Path to hover-state image
}
```

### Feature toggle

```ts
features: {
  subscribeModal: boolean;  // true = show email modal before opening resources
}
```

When `subscribeModal` is `true`, clicking a "live" card shows a subscribe modal that posts to `siteConfig.blog.subscribeUrl`. After subscribing or skipping, access is saved in `localStorage` under the key `os_resource_access` so the modal won't reappear.

### Default values

```ts
resources: [
  {
    id: "project-1",
    title: "Insert title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    badge: "live",
    link: "https://example.com/project-1",
    buttonLabel: "Link",
    mediaDefault: "/images/placeholder-resource-01.svg",
    mediaType: "image",
    imageHover: "/images/placeholder-resource-02.svg",
  },
  {
    id: "project-2",
    title: "Insert title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    badge: "live",
    link: "https://example.com/project-2",
    buttonLabel: "Link",
    mediaDefault: "/images/placeholder-resource-02.svg",
    mediaType: "image",
    imageHover: "/images/placeholder-resource-01.svg",
  },
  {
    id: "project-3",
    title: "Insert title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    badge: "coming-soon",
    link: "#",
    buttonLabel: "Link",
    mediaDefault: "/images/placeholder-resource-01.svg",
    mediaType: "image",
    imageHover: "/images/placeholder-resource-02.svg",
  },
],

features: {
  subscribeModal: false,
}
```

## How to Customize

1. **Replace resource content** — Update each object in the `resources` array in `site.config.ts` with your project titles, descriptions, links, and badges.
2. **Add your images** — Drop image files in `public/images/` and update `mediaDefault` and `imageHover` paths. The image area is about 192px tall.
3. **Use video instead of images** — Set `mediaType` to `"video"` and point `mediaDefault` to a video file path. The video will autoplay and loop silently.
4. **Change button labels** — Update the `buttonLabel` field (e.g., `"View Project"`, `"Download"`, `"Read More"`).
5. **Toggle the subscribe modal** — Set `features.subscribeModal` to `true` and make sure `blog.subscribeUrl` is set to your Substack URL.
6. **Change the section heading** — The heading "Resources" is hardcoded on line 128 of `FreeResources.tsx`. Edit the component directly to change it.

## Example AI Prompts

Copy-paste these to an AI assistant to customize this section:

> **Config-only** — "Replace the three resource cards with my projects: 'CLI Toolkit' (live, links to https://github.com/me/cli-toolkit), 'Design System' (live, links to https://design.example.com), and 'Mobile App' (coming soon). Use 'View Project' as the button label for all three."

> **Config + Assets** — "I've added project screenshots to public/images/ as cli-default.png, cli-hover.png, design-default.png, and design-hover.png. Update the first two resource cards to use these images."

> **Config-only** — "Enable the subscribe modal so users must enter their email before accessing resources. My Substack URL is https://myblog.substack.com."

> **Config-only** — "Change all resource card button labels from 'Link' to 'Open'."

> **Component edit** — "Change the resources section heading from 'Resources' to 'Featured Projects'."

---

*[Back to index](README.md)*
