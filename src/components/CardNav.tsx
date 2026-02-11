"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { siteConfig, withBasePath } from "@/config/site.config";

export function CardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { nav, branding } = siteConfig;

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const tl = gsap.timeline();

    if (isOpen) {
      // Desktop uses fixed height to align with OurLinks, mobile/tablet uses auto
      const isDesktop = window.innerWidth >= 1024;
      const targetHeight = isDesktop ? 235 : "auto";

      // Expand animation
      tl.to(containerRef.current, {
        height: targetHeight,
        duration: 0.4,
        ease: "power2.out",
      })
        .fromTo(
          cardsRef.current.children,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      // Collapse animation
      tl.to(cardsRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      }).to(containerRef.current, {
        height: 60,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Hamburger to X animation
  useEffect(() => {
    if (!hamburgerRef.current) return;
    const lines = hamburgerRef.current.querySelectorAll("span");

    if (isOpen) {
      gsap.to(lines[0], {
        rotation: 45,
        y: 8,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], {
        opacity: 0,
        scaleX: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(lines[2], {
        rotation: -45,
        y: -8,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(lines[0], {
        rotation: 0,
        y: 0,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.to(lines[2], {
        rotation: 0,
        y: 0,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  // Background blur overlay animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Fade in overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Fade out overlay - slower than card collapse for smooth feel
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              visibility: "hidden",
              pointerEvents: "none",
            });
          }
        },
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Background blur overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: "rgba(25, 25, 25, 0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
        onClick={() => setIsOpen(false)}
      />

      <nav className="w-full relative z-50">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl shadow-md"
            style={{
              background: "var(--color-vanilla)",
              border: "1px solid var(--border-secondary)",
              height: 60,
            }}
          >
            {/* Header Row */}
            <div className="relative flex items-center justify-between h-[60px] px-4">
              {/* Hamburger / X Button */}
              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span
                  className="block w-5 h-0.5 origin-center"
                  style={{ background: "var(--color-charcoal)" }}
                />
                <span
                  className="block w-5 h-0.5 origin-center"
                  style={{ background: "var(--color-charcoal)" }}
                />
                <span
                  className="block w-5 h-0.5 origin-center"
                  style={{ background: "var(--color-charcoal)" }}
                />
              </button>

              {/* Centered Logo or Text */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                {branding.logo ? (
                  <img
                    src={withBasePath(branding.logo)}
                    alt={branding.logoAlt}
                    className="h-[32px] sm:h-[36px] w-auto"
                  />
                ) : (
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {branding.logoAlt}
                  </span>
                )}
              </div>

              {/* Globe Icon Button */}
              <a
                href={branding.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 transition-opacity hover:opacity-70 flex-shrink-0"
                aria-label="Visit website"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-charcoal)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </a>
            </div>

            {/* Cards Container */}
            <div
              ref={cardsRef}
              className="px-4 pb-4 grid gap-3 md:grid-cols-3 grid-cols-1 overflow-hidden"
                          >
              {nav.map((card) => (
                <a
                  key={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-card group relative flex flex-col justify-between p-5 rounded-xl text-left font-accent text-2xl font-bold min-h-[148px]"
                  style={{
                    background: "var(--color-charcoal)",
                  }}
                >
                  {/* External link arrow - top right */}
                  <div className="flex justify-end">
                    <svg
                      className="nav-card-arrow w-5 h-5 transition-colors duration-150"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.833 14.167L14.166 5.833M14.166 5.833H5.833M14.166 5.833V14.167"
                        stroke="currentColor"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {/* Label - bottom left */}
                  <span className="nav-card-text transition-colors duration-150">
                    {card.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
