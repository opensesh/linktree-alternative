import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { FaultyTerminal } from "@/components/FaultyTerminal";
import { siteConfig, withBasePath } from "@/config/site.config";

// Generate metadata from config
export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  icons: {
    icon: [
      { url: withBasePath(siteConfig.metadata.favicon), type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { analytics, features } = siteConfig;
  const hasAnalytics = analytics.googleAnalyticsId.length > 0;

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics - only if configured */}
        {hasAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analytics.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        {/* Background layer - fixed, behind all content */}
        {features.crtEffect && (
          <div className="fixed inset-0 z-0" aria-hidden="true">
            <FaultyTerminal
              tint={features.crtTint}
              brightness={features.crtBrightness}
              curvature={0.4}
              mouseReact={true}
              mouseStrength={1.5}
              scale={1.2}
              scanlineIntensity={0.5}
              noiseAmp={1}
              pageLoadAnimation={true}
            />
          </div>
        )}
        {/* Content layer - above background */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
