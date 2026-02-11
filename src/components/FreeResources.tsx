"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SubscribeModal, hasResourceAccess } from "./SubscribeModal";
import { siteConfig, withBasePath, type Resource } from "@/config/site.config";

// Custom icon component - stroke-based for consistent outline style
function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Badge({ text, variant }: { text: string; variant: "coming-soon" | "live" }) {
  const badgeClass = variant === "coming-soon" ? "badge-coming-soon" : "badge-live";
  return (
    <span className={`resource-card-badge font-medium rounded-full ${badgeClass}`}>
      {text}
    </span>
  );
}

function ResourceCardComponent({
  card,
  isLast,
  onCardClick,
}: {
  card: Resource;
  isLast: boolean;
  onCardClick: (card: Resource) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isLive = card.badge === "live";
  const badgeText = card.badge === "coming-soon" ? "Coming Soon" : "Live";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLive) {
      onCardClick(card);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && isLive) {
      e.preventDefault();
      onCardClick(card);
    }
  };

  return (
    <motion.div
      className={`resource-card w-full flex flex-col ${isLast ? "md:col-span-2" : ""} ${isLive ? "cursor-pointer" : ""}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isLive ? "button" : undefined}
      tabIndex={isLive ? 0 : undefined}
    >
      {/* Image/Video Area - rounded-t-[11px] to account for 1px border */}
      <div className="h-48 relative bg-[#191919] rounded-t-[11px] overflow-hidden">
        {/* O1 - Default media (image or video) */}
        {card.mediaType === "video" ? (
          <motion.video
            src={withBasePath(card.mediaDefault)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-top"
            animate={{
              scale: isHovered ? 1.02 : 1,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        ) : (
          <motion.img
            src={withBasePath(card.mediaDefault)}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            animate={{
              scale: isHovered ? 1.02 : 1,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        )}

        {/* O2 - Hover image with crossfade + subtle scale */}
        <motion.img
          src={withBasePath(card.imageHover)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 1.05,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Badge - Top Right */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <Badge text={badgeText} variant={card.badge} />
        </div>
      </div>

      {/* Content Area */}
      <div className="resource-card-content flex flex-col flex-grow">
        <h3 className="resource-card-title font-accent font-bold text-[var(--color-vanilla)] mb-1.5 sm:mb-2">
          {card.title}
        </h3>
        <p className="resource-card-description text-[var(--color-vanilla)]/70 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
          {card.description}
        </p>
        <span className="card-button inline-flex items-center gap-1.5 sm:gap-2 font-medium rounded-lg self-start">
          {card.buttonLabel}
          <ExternalLinkIcon />
        </span>
      </div>
    </motion.div>
  );
}

export function FreeResources() {
  const resourceCards = siteConfig.resources;
  const { subscribeModal } = siteConfig.features;

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    card: Resource | null;
  }>({ isOpen: false, card: null });

  const handleCardClick = (card: Resource) => {
    // If subscribe modal is disabled or user has already subscribed/skipped, open resource directly
    if (!subscribeModal || hasResourceAccess()) {
      window.open(card.link, "_blank", "noopener,noreferrer");
      return;
    }
    // Otherwise show the subscribe modal
    setModalState({ isOpen: true, card });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, card: null });
  };

  return (
    <>
      <section className="w-full mt-6 sm:mt-8">
        {/* Container with max-width */}
        <div className="max-w-[var(--content-max-width)] mx-auto">
          {/* Heading */}
          <h2
            className="text-xl font-bold mb-3 sm:mb-4"
            style={{ color: "var(--color-vanilla)" }}
          >
            Resources
          </h2>

          {/* Responsive grid - 1 col mobile, 2 cols on md+ with 3rd card spanning both */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceCards.map((card, index) => (
              <ResourceCardComponent
                key={card.id}
                card={card}
                isLast={index === resourceCards.length - 1}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSkip={handleCloseModal}
        resourceTitle={modalState.card?.title ?? ""}
        resourceHref={modalState.card?.link ?? "#"}
      />
    </>
  );
}
