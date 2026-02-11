"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig, withBasePath } from "@/config/site.config";

export function TechStack() {
  const techStack = siteConfig.tools;

  // Default to index 7 (or first item if fewer tools)
  const defaultIndex = Math.min(7, techStack.length - 1);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
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

  if (techStack.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-8 sm:mt-10 mb-8">
      {/* Heading - aligned with max-w content */}
      <div className="px-4 mb-4">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Tools
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
            aria-label="Tools carousel"
            aria-activedescendant={`tech-item-${selected?.id}`}
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
                  const isSelected = selected?.id === item.id;
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
                        src={withBasePath(item.icon)}
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
                {selected && (
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
                          className="text-[#fffaee] text-[22px] font-accent font-bold leading-none tracking-[-0.25px] transition-colors duration-200 hover:text-[var(--fg-brand-primary)]"
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
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
