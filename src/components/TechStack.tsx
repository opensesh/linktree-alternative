"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Tag data structure
interface TagData {
  label: string;
  bg: string;
  text: string;
}

// Tech item structure
interface TechItem {
  id: string;
  name: string;
  icon: string;
  url: string;
  description: string;
  tags: TagData[];
  smallIcon?: boolean;
}

// Category colors for primary tags
// All colors chosen for WCAG AA contrast (4.5:1+) with white text
const CATEGORY_COLORS = {
  Productivity: "#5326ab",
  Design: "#e64400",
  Coding: "#007acc",
  Content: "#158f4a", // Darkened from #24CB71 for accessibility
};

const COMMON_TAG_STYLES = { bg: "#fffaee", text: "#414651" };

// Tech stack data with descriptions and tags (order matches Figma)
const techStack: TechItem[] = [
  {
    id: "claude",
    name: "Claude",
    icon: "/OS_our-links/icons/tech/command/claude.png",
    url: "https://claude.ai",
    description:
      "Our go-to AI assistant for complex reasoning, planning, research, and creative writing.",
    tags: [
      { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fffaee" },
      { label: "AI", ...COMMON_TAG_STYLES },
      { label: "Reasoning", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "/OS_our-links/icons/tech/command/cursor.png",
    url: "https://cursor.sh",
    description:
      "Our go-to IDE, though we typically use Claude Code as a VS Code extension instead of paying monthly.",
    tags: [
      { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fffaee" },
      { label: "IDE", ...COMMON_TAG_STYLES },
      { label: "Editor", ...COMMON_TAG_STYLES },
      { label: "Free + Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/OS_our-links/icons/tech/command/github.png",
    url: "https://github.com",
    description:
      "The standard for version control and coding workflows. All of our codebases live here.",
    tags: [
      { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fffaee" },
      { label: "Git", ...COMMON_TAG_STYLES },
      { label: "Version Control", ...COMMON_TAG_STYLES },
      { label: "Free", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "figma",
    name: "Figma",
    icon: "/OS_our-links/icons/tech/command/figma.png",
    url: "https://figma.com",
    description:
      "Our creative design canvas where we have our main design system and create almost all of our content and visual design.",
    tags: [
      { label: "Design", bg: CATEGORY_COLORS.Design, text: "#fffaee" },
      { label: "UI/UX", ...COMMON_TAG_STYLES },
      { label: "Design System", ...COMMON_TAG_STYLES },
      { label: "Free + Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "framer",
    name: "Framer",
    icon: "/OS_our-links/icons/tech/command/framer.png",
    url: "https://framer.com",
    description:
      "Great for building interactive websites for our clients and our own landing pages and web projects.",
    tags: [
      { label: "Design", bg: CATEGORY_COLORS.Design, text: "#fffaee" },
      { label: "No-Code", ...COMMON_TAG_STYLES },
      { label: "Website", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "notion",
    name: "Notion",
    icon: "/OS_our-links/icons/tech/command/notion.png",
    url: "https://notion.so",
    description:
      "Our all-in-one workspace for notes, tasks, wikis, and database management.",
    tags: [
      {
        label: "Productivity",
        bg: CATEGORY_COLORS.Productivity,
        text: "#fffaee",
      },
      { label: "Notes", ...COMMON_TAG_STYLES },
      { label: "Collaboration", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "wispr",
    name: "Wispr Flow",
    icon: "/OS_our-links/icons/tech/command/wispr.png",
    url: "https://wispr.ai",
    description:
      "Voice dictation that actually works, helping us capture thoughts at the speed of speech.",
    tags: [
      {
        label: "Productivity",
        bg: CATEGORY_COLORS.Productivity,
        text: "#fffaee",
      },
      { label: "Voice", ...COMMON_TAG_STYLES },
      { label: "Mac", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "obsidian",
    name: "Obsidian",
    icon: "/OS_our-links/icons/tech/command/obsidian.png",
    url: "https://obsidian.md",
    description:
      "We use this free open source tool to quickly view and manage markdown files",
    tags: [
      {
        label: "Productivity",
        bg: CATEGORY_COLORS.Productivity,
        text: "#fffaee",
      },
      { label: "Open Source", ...COMMON_TAG_STYLES },
      { label: "Markdown", ...COMMON_TAG_STYLES },
      { label: "Free", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "comet",
    name: "Comet",
    icon: "/OS_our-links/icons/tech/command/comet.png",
    url: "https://perplexity.ai/comet",
    description:
      "Our favorite AI browser by Perplexity. We find it incredibly useful for research and browser actions.",
    tags: [
      { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fffaee" },
      { label: "AI", ...COMMON_TAG_STYLES },
      { label: "Browser", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "conductor",
    name: "Conductor",
    icon: "/OS_our-links/icons/tech/command/conductor.png",
    url: "https://www.conductor.build/",
    description:
      "For managing multi-agent workflows with Claude Code in a better UI than most IDEs.",
    tags: [
      { label: "Coding", bg: CATEGORY_COLORS.Coding, text: "#fffaee" },
      { label: "AI", ...COMMON_TAG_STYLES },
      { label: "Multi-Agent", ...COMMON_TAG_STYLES },
      { label: "Free", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "premiere",
    name: "Premiere Pro",
    icon: "/OS_our-links/icons/tech/command/premiere.png",
    url: "https://www.adobe.com/products/premiere.html",
    description:
      "Industry standard video editing software for our long-form content production.",
    tags: [
      { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fffaee" },
      { label: "Video", ...COMMON_TAG_STYLES },
      { label: "Adobe", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "aftereffects",
    name: "After Effects",
    icon: "/OS_our-links/icons/tech/command/aftereffects.png",
    url: "https://www.adobe.com/products/aftereffects.html",
    description:
      "Used for creating complex motion graphics and visual effects in our videos.",
    tags: [
      { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fffaee" },
      { label: "Motion", ...COMMON_TAG_STYLES },
      { label: "VFX", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "lightroom",
    name: "Lightroom",
    icon: "/OS_our-links/icons/tech/command/lightroom.png",
    url: "https://www.adobe.com/products/photoshop-lightroom.html",
    description:
      "Essential for color grading and organizing our photo assets and thumbnails.",
    tags: [
      { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fffaee" },
      { label: "Photo", ...COMMON_TAG_STYLES },
      { label: "Color", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "runway",
    name: "Runway",
    icon: "/OS_our-links/icons/tech/command/runway.png",
    url: "https://runway.ml",
    description:
      "AI video generation tool that helps us storyboard and create supplementary footage.",
    smallIcon: true,
    tags: [
      { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fffaee" },
      { label: "AI Video", ...COMMON_TAG_STYLES },
      { label: "Creative", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "openscreen",
    name: "Open Screen",
    icon: "/OS_our-links/icons/tech/command/openscreen.png",
    url: "https://opensession.co",
    description:
      "A lightweight utility for recording screen captures and sharing quick demos.",
    smallIcon: true,
    tags: [
      { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fffaee" },
      { label: "Utility", ...COMMON_TAG_STYLES },
      { label: "Screen", ...COMMON_TAG_STYLES },
      { label: "Free", ...COMMON_TAG_STYLES },
    ],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    icon: "/OS_our-links/icons/tech/command/midjourney.png",
    url: "https://midjourney.com",
    description:
      "Our primary tool for generating creative imagery and conceptual art assets.",
    smallIcon: true,
    tags: [
      { label: "Content", bg: CATEGORY_COLORS.Content, text: "#fffaee" },
      { label: "AI Art", ...COMMON_TAG_STYLES },
      { label: "Image", ...COMMON_TAG_STYLES },
      { label: "Paid", ...COMMON_TAG_STYLES },
    ],
  },
];

export function TechStack() {
  // Default to Obsidian (index 7) as shown in Figma
  const [selectedIndex, setSelectedIndex] = useState(7);
  const selected = techStack[selectedIndex];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Guard to prevent scroll detection during programmatic scrolls
  const isProgrammaticScroll = useRef(false);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + techStack.length) % techStack.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % techStack.length);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Calculate which item is closest to the center of the container
  const findCenteredItemIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return selectedIndex;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [selectedIndex]);

  // Scroll to center the selected item when selection changes programmatically
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Mark this as a programmatic scroll to prevent scroll detection from firing
    isProgrammaticScroll.current = true;

    // Wait for size transitions to complete (300ms duration-300)
    // before calculating scroll position
    const timeoutId = setTimeout(() => {
      const selectedElement = itemsRef.current[selectedIndex];
      if (!selectedElement) return;

      // Get the center of the container
      const containerCenter = container.offsetWidth / 2;

      // Get the center of the selected element relative to the scroll container
      const elementLeft = selectedElement.offsetLeft;
      const elementWidth = selectedElement.offsetWidth;
      const elementCenter = elementLeft + elementWidth / 2;

      // Calculate scroll position to center the element
      const scrollTarget = elementCenter - containerCenter;

      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });

      // Reset the guard after scroll animation completes
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
    }, 310); // Slightly longer than the 300ms transition

    return () => clearTimeout(timeoutId);
  }, [selectedIndex]);

  // Detect when user scrolls and update selection based on centered item
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      // Skip if this was a programmatic scroll
      if (isProgrammaticScroll.current) return;

      const centeredIndex = findCenteredItemIndex();
      if (centeredIndex !== selectedIndex) {
        setSelectedIndex(centeredIndex);
      }
    };

    // Modern browsers: use scrollend event
    if ("onscrollend" in window) {
      container.addEventListener("scrollend", handleScrollEnd);
      return () => container.removeEventListener("scrollend", handleScrollEnd);
    }

    // Fallback: debounced scroll for older Safari
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [selectedIndex, findCenteredItemIndex]);

  return (
    <section className="w-full mt-8 sm:mt-10 mb-8">
      {/* Heading - aligned with max-w content */}
      <div className="px-4 mb-4">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Our Tools
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-4">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <div
            ref={containerRef}
            className="w-full relative rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-brand-primary)]/50"
            style={{
              background: "#191919",
              border: "1px solid #4a4a4a",
            }}
            tabIndex={0}
            role="listbox"
            aria-label="Our tools carousel"
            aria-activedescendant={`tech-item-${selected.id}`}
            onKeyDown={handleKeyDown}
          >
            {/* Icons Scroll Area - fixed height to prevent jolt during transitions */}
            <div style={{ background: "#4a4a4a", height: 116 }}>
              <div
                ref={scrollContainerRef}
                className="flex items-center gap-4 py-2 overflow-x-auto w-full h-full [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  scrollSnapType: "x mandatory",
                }}
              >
                {/* Left spacer - allows first items to center */}
                <div className="shrink-0 w-[calc(50%-50px)]" />

                {techStack.map((item, index) => {
                  const isSelected = selected.id === item.id;
                  // Selected icons are larger (100px vs 72px = 1.4x scale)
                  const size = isSelected ? 100 : 72;

                  return (
                    <button
                      key={item.id}
                      id={`tech-item-${item.id}`}
                      ref={(el) => {
                        itemsRef.current[index] = el;
                      }}
                      onClick={() => setSelectedIndex(index)}
                      className={`relative shrink-0 rounded-xl transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "z-10 opacity-100"
                          : "opacity-50 hover:opacity-100"
                      }`}
                      style={{
                        width: size,
                        height: size,
                        scrollSnapAlign: "center",
                      }}
                      role="option"
                      aria-selected={isSelected}
                      aria-label={item.name}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={`object-cover rounded-[10px] ${
                          item.smallIcon && !isSelected ? "w-[57px] h-[57px]" : "w-full h-full"
                        }`}
                      />
                    </button>
                  );
                })}

                {/* Spacer to help center alignment at ends */}
                <div className="shrink-0 w-[calc(50%-50px)]" />
              </div>
            </div>

            {/* Selected Item Details */}
            <div className="p-4 flex flex-col items-center justify-center min-h-[140px] text-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center w-full max-w-md"
                >
                  {/* Title with Arrows */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <button
                      onClick={handlePrev}
                      className="p-1 rounded-full transition-colors"
                      style={{ color: "#a4a7ae" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#fffaee")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#a4a7ae")
                      }
                      aria-label="Previous tool"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex flex-col items-center">
                      <a
                        href={selected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#fffaee] text-[22px] font-accent font-bold leading-none tracking-[-0.25px] transition-colors duration-200 hover:text-[#FE5102]"
                      >
                        {selected.name}
                      </a>
                      {/* Underline */}
                      <div
                        className="w-full h-px mt-1"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255, 250, 238, 0.3), transparent)",
                        }}
                      />
                    </div>

                    <button
                      onClick={handleNext}
                      className="p-1 rounded-full transition-colors"
                      style={{ color: "#a4a7ae" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#fffaee")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#a4a7ae")
                      }
                      aria-label="Next tool"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[12px] leading-[1.25] mb-2 max-w-[264px]"
                    style={{ color: "#fffaee" }}
                  >
                    {selected.description}
                  </p>

                  {/* Tags */}
                  {selected.tags && (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {selected.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="flex items-center justify-center px-2 py-1 rounded-[3px] text-[10px] font-medium leading-none"
                          style={{
                            backgroundColor: tag.bg,
                            color: tag.text,
                            border: "0.5px solid #4a4a4a",
                          }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
