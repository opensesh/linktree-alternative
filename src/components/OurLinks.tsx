"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Breakpoint for carousel mode (matches sm: breakpoint roughly)
const CAROUSEL_BREAKPOINT = 600;

// Media query subscription for useSyncExternalStore
function subscribeToCarouselMode(callback: () => void) {
  const mq = window.matchMedia(`(max-width: ${CAROUSEL_BREAKPOINT}px)`);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getCarouselModeSnapshot() {
  return window.matchMedia(`(max-width: ${CAROUSEL_BREAKPOINT}px)`).matches;
}

function getServerCarouselModeSnapshot() {
  return false; // SSR: default to non-carousel mode
}

// Icon components - all stroke-based for consistent outline style
function FigmaIcon() {
  return (
    <svg
      className="link-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="link-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg
      className="link-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 10h16" />
      <path d="M4 14v8l8-4 8 4v-8" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="link-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg
      className="link-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="6.5" cy="12" rx="4.5" ry="6" />
      <ellipse cx="17" cy="12" rx="2" ry="6" />
      <line x1="22" y1="6" x2="22" y2="18" />
    </svg>
  );
}

interface LinkItem {
  id: string;
  title: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
}

// Links in display order
const links: LinkItem[] = [
  {
    id: "figma",
    title: "Figma",
    handle: "@opensession",
    href: "https://link.opensession.co/website-figma",
    icon: <FigmaIcon />,
  },
  {
    id: "github",
    title: "Github",
    handle: "@opensesh",
    href: "https://link.opensession.co/website-github",
    icon: <GitHubIcon />,
  },
  {
    id: "substack",
    title: "Substack",
    handle: "@opensession",
    href: "https://link.opensession.co/website-substack",
    icon: <SubstackIcon />,
  },
  {
    id: "instagram",
    title: "Insta",
    handle: "@opensession.co",
    href: "https://link.opensession.co/website-instagram",
    icon: <InstagramIcon />,
  },
  {
    id: "medium",
    title: "Medium",
    handle: "@opensession",
    href: "https://link.opensession.co/website-medium",
    icon: <MediumIcon />,
  },
];

export function OurLinks() {
  // Use useSyncExternalStore for media query to avoid setState-in-effect pattern
  const isCarouselMode = useSyncExternalStore(
    subscribeToCarouselMode,
    getCarouselModeSnapshot,
    getServerCarouselModeSnapshot
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update scroll state based on current scroll position
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Can scroll left if we're not at the very start (allow small threshold for rounding)
    setCanScrollLeft(scrollLeft > 2);
    // Can scroll right if we haven't reached the end
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  };

  // Reset scroll position when entering carousel mode so Figma is fully visible
  useEffect(() => {
    if (isCarouselMode && scrollRef.current) {
      // Use requestAnimationFrame to ensure layout is complete before setting scroll
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = 0;
          updateScrollState();
        }
      });
    }
  }, [isCarouselMode]);

  // Listen for scroll events to update arrow states
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isCarouselMode) return;

    scrollContainer.addEventListener("scroll", updateScrollState);
    // Initial state check
    updateScrollState();

    return () => scrollContainer.removeEventListener("scroll", updateScrollState);
  }, [isCarouselMode]);

  // Scroll handlers for arrow navigation
  const scrollToCard = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    if (direction === "prev" && !canScrollLeft) return;
    if (direction === "next" && !canScrollRight) return;
    const scrollAmount = 108; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full mt-4">
      {/* Container with max-width */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Heading - Neue Haas Grotesk */}
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: "var(--color-vanilla)" }}
        >
          Our Links
        </h2>

        {isCarouselMode ? (
          /* Carousel mode - horizontal scroll with arrows inside container */
          <div
            className="rounded-xl py-3"
            style={{ background: "var(--color-charcoal)" }}
          >
          <div className="relative">
            {/* Left gradient overlay with arrow - always visible */}
            <div
              className="absolute left-0 top-0 bottom-0 w-14 z-10 flex items-center justify-start pl-2"
              style={{
                background: "linear-gradient(to right, #191919 70%, transparent)",
              }}
            >
              <button
                onClick={() => scrollToCard("prev")}
                className={`our-links-arrow ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Previous link"
                disabled={!canScrollLeft}
              >
                <ChevronLeft size={20} />
              </button>
            </div>

            {/* Scrollable container */}
            <div
              ref={scrollRef}
              className="our-links-carousel"
            >
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card carousel-card flex flex-col justify-between p-3 rounded-xl transition-all duration-150 aspect-square"
                  style={{
                    background: "var(--color-charcoal)",
                    border: "1px solid var(--color-vanilla)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="link-card-icon"
                    style={{ color: "var(--color-vanilla)" }}
                  >
                    {link.icon}
                  </div>

                  {/* Text content - positioned at bottom */}
                  <div className="flex flex-col min-w-0 w-full overflow-hidden">
                    <span
                      className="text-xs font-semibold leading-tight"
                      style={{ color: "var(--color-vanilla)" }}
                    >
                      {link.title}
                    </span>
                    <span className="text-[11px] leading-tight truncate text-[var(--color-vanilla)]/70">
                      {link.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Right gradient overlay with arrow */}
            <div
              className="absolute right-0 top-0 bottom-0 w-14 z-10 flex items-center justify-end pr-2"
              style={{
                background: "linear-gradient(to left, #191919 70%, transparent)",
              }}
            >
              <button
                onClick={() => scrollToCard("next")}
                className={`our-links-arrow ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Next link"
                disabled={!canScrollRight}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          </div>
        ) : (
          /* Grid mode - single row, all cards visible */
          <div className="flex gap-2">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card flex-1 flex flex-col justify-between p-3 rounded-xl transition-all duration-150 aspect-square"
                style={{
                  background: "var(--color-charcoal)",
                  border: "1px solid var(--color-vanilla)",
                }}
              >
                {/* Icon */}
                <div
                  className="link-card-icon"
                  style={{ color: "var(--color-vanilla)" }}
                >
                  {link.icon}
                </div>

                {/* Text content - positioned at bottom */}
                <div className="flex flex-col min-w-0 w-full overflow-hidden">
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={{ color: "var(--color-vanilla)" }}
                  >
                    {link.title}
                  </span>
                  <span className="text-[11px] leading-tight truncate text-[var(--color-vanilla)]/70">
                    {link.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
