import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-[calc(100%+2*clamp(1rem,4vw,3rem))] -mx-[clamp(1rem,4vw,3rem)] bg-[var(--color-charcoal)] mt-8 py-12">
      {/* Content container - matches NavCard max-width */}
      <div className="max-w-[var(--content-max-width)] mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Left column - Tagline & Email */}
          <div className="flex flex-col gap-6">
            <p className="text-[var(--color-vanilla)]/70 text-sm font-medium leading-relaxed">
              Transform your brand. Leverage AI.
              <br />
              Bring bold ideas to life.{" "}
              <a
                href="https://opensession.co"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-0.5 text-[var(--color-aperol)] hover:underline underline-offset-2 transition-all"
              >
                Start here
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            </p>
            <a
              href="mailto:hello@opensession.co"
              className="text-[var(--color-vanilla)] text-xl sm:text-2xl font-bold hover:text-[var(--color-aperol)] transition-colors"
            >
              hello@opensession.co
            </a>
          </div>

          {/* Right column - Made with love & Copyright (bottom-right aligned) */}
          <div className="flex flex-col items-start sm:items-end justify-end gap-2">
            <div className="flex flex-col items-start sm:items-end">
              <span className="font-accent text-sm text-[var(--color-vanilla)]/50">
                Made with
              </span>
              <span className="font-accent text-3xl sm:text-4xl text-[var(--color-vanilla)]/70 -mt-1">
                love<sup className="text-xs">™</sup>
              </span>
            </div>
            <p className="text-[var(--color-vanilla)]/50 text-sm">
              © 2026 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
