"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface ShuffleTextProps {
  text: string;
  className?: string;
  // Animation settings
  duration?: number;
  shuffleTimes?: number;
  stagger?: number;
  ease?: string;
  // Trigger settings
  playOnMount?: boolean;
  hoverReplay?: boolean;
}

const SHUFFLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ShuffleText({
  text,
  className = "",
  duration = 0.2,
  shuffleTimes = 1,
  stagger = 0.09,
  ease = "power3.out",
  playOnMount = true,
  hoverReplay = true,
}: ShuffleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const getRandomChar = useCallback(() => {
    return SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
  }, []);

  const clearAllIntervals = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }, []);

  const playAnimation = useCallback(() => {
    if (!containerRef.current || isAnimatingRef.current) return;

    const chars = containerRef.current.querySelectorAll<HTMLSpanElement>(".shuffle-char");
    if (!chars.length) return;

    isAnimatingRef.current = true;
    clearAllIntervals();

    // Calculate total shuffle iterations based on duration and a reasonable interval
    const shuffleIntervalMs = 50; // 50ms between each random character
    const totalShuffles = Math.max(1, Math.floor((duration * 1000) / shuffleIntervalMs) * shuffleTimes);

    chars.forEach((char, index) => {
      // Get original character from data attribute
      const originalChar = char.dataset.char || "";
      const charDelay = index * stagger * 1000;

      // Start shuffling after stagger delay
      const startTimeout = setTimeout(() => {
        let shuffleCount = 0;

        const shuffleId = setInterval(() => {
          if (shuffleCount < totalShuffles) {
            char.textContent = getRandomChar();
            shuffleCount++;
          } else {
            clearInterval(shuffleId);
            char.textContent = originalChar;
          }
        }, shuffleIntervalMs);

        intervalsRef.current.push(shuffleId);
      }, charDelay);

      intervalsRef.current.push(startTimeout as unknown as NodeJS.Timeout);
    });

    // Mark animation as complete after all characters finish
    const totalDuration = chars.length * stagger * 1000 + duration * 1000 + 100;
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, totalDuration);
  }, [duration, shuffleTimes, stagger, getRandomChar, clearAllIntervals]);

  const handleMouseEnter = useCallback(() => {
    if (hoverReplay && !isAnimatingRef.current) {
      playAnimation();
    }
  }, [hoverReplay, playAnimation]);

  useEffect(() => {
    if (playOnMount) {
      // Small delay to ensure DOM is ready
      const initTimeout = setTimeout(playAnimation, 100);
      return () => {
        clearTimeout(initTimeout);
        clearAllIntervals();
      };
    }
  }, [playOnMount, playAnimation, clearAllIntervals]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, [clearAllIntervals]);

  return (
    <span
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ letterSpacing: "-0.02em" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={char === " " ? "" : "shuffle-char"}
          data-char={char !== " " ? char : undefined}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
