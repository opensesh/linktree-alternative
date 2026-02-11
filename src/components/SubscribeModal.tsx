"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, FormEvent, useCallback } from "react";
import { X, Check, Copy } from "lucide-react";
import { ShuffleText } from "./ShuffleText";
import { siteConfig } from "@/config/site.config";

// localStorage key for resource access persistence
const STORAGE_KEY = "os_resource_access";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  resourceTitle: string;
  resourceHref: string;
}

// Save to localStorage that user has accessed resources
function saveResourceAccess(method: "subscribe" | "skip") {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        accessed: true,
        method,
        timestamp: Date.now(),
      })
    );
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }
}

// Check if user has already accessed resources
export function hasResourceAccess(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored).accessed === true : false;
  } catch {
    return false;
  }
}

export function SubscribeModal({
  isOpen,
  onClose,
  onSkip,
  resourceTitle,
  resourceHref,
}: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit to Substack via form (opens in new tab for confirmation)
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${siteConfig.blog.subscribeUrl}/api/v1/free?nojs=true`;
    form.target = "_blank";

    const emailInput = document.createElement("input");
    emailInput.name = "email";
    emailInput.value = email;
    form.appendChild(emailInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Save to localStorage so user won't see modal again
    saveResourceAccess("subscribe");

    // Show success state with resource link (user clicks to access)
    setIsSubscribed(true);
    setIsSubmitting(false);
  };

  const handleSkip = () => {
    // Save to localStorage so user won't see modal again
    saveResourceAccess("skip");
    window.open(resourceHref, "_blank", "noopener,noreferrer");
    onSkip();
  };

  const handleAccessResource = () => {
    window.open(resourceHref, "_blank", "noopener,noreferrer");
    handleReset();
  };

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resourceHref);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = resourceHref;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  }, [resourceHref]);

  const handleReset = () => {
    setEmail("");
    setIsSubscribed(false);
    setIsSubmitting(false);
    setLinkCopied(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-2xl p-6 shadow-xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-[var(--fg-tertiary)] hover:text-[var(--fg-primary)] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Logo icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-[var(--fg-brand-primary)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-lg font-accent font-bold text-[var(--fg-primary)] mb-2">
                  <ShuffleText
                    text="STAY IN THE LOOP"
                    duration={0.2}
                    shuffleTimes={1}
                    stagger={0.09}
                    ease="power3.out"
                    playOnMount={true}
                    hoverReplay={true}
                  />
                </h2>
                <p className="text-sm text-[var(--fg-secondary)] mb-6">
                  Subscribe to get notified when we release new resources like{" "}
                  <span className="font-medium text-[var(--fg-primary)]">
                    {resourceTitle}
                  </span>
                </p>

                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    {/* Success checkmark */}
                    <div className="flex justify-center mb-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
                        className="w-12 h-12 rounded-full bg-[var(--bg-brand-solid)]/10 flex items-center justify-center"
                      >
                        <Check className="w-6 h-6 text-[var(--fg-brand-primary)]" />
                      </motion.div>
                    </div>

                    <div>
                      <p className="text-[var(--fg-brand-primary)] font-medium">
                        Thanks for subscribing!
                      </p>
                      <p className="text-sm text-[var(--fg-tertiary)] mt-1">
                        You&apos;re all set. Access your resource below.
                      </p>
                    </div>

                    {/* Primary: Access Resource button */}
                    <button
                      onClick={handleAccessResource}
                      className="subscribe-button w-full bg-[var(--bg-brand-solid)] hover:bg-[var(--bg-brand-solid-hover)] text-white border-transparent"
                    >
                      Access {resourceTitle}
                    </button>

                    {/* Secondary: Copy Link button */}
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                    >
                      {linkCopied ? (
                        <>
                          <Check className="w-4 h-4 text-[var(--fg-brand-primary)]" />
                          <span className="text-[var(--fg-brand-primary)]">Link copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy link</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="subscribe-input w-full"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      className="subscribe-button w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                )}
              </div>

              {/* Skip link */}
              {!isSubscribed && (
                <button
                  onClick={handleSkip}
                  className="mt-4 w-full text-center text-sm text-[var(--fg-quaternary)] hover:text-[var(--fg-tertiary)] transition-colors"
                >
                  Skip and view resource
                </button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
