import { CardNav } from "@/components/CardNav";
import { Footer } from "@/components/Footer";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* NAVCARD - fixed layer outside clipper */}
      <div className="fixed left-0 right-0 top-4 z-50 px-[clamp(1rem,4vw,3rem)]">
        <CardNav />
      </div>

      {/* CLIPPER - clips content at NavCard bottom, scrollbar at viewport edge */}
      <div
        className="fixed left-0 right-0 z-10 overflow-clip"
        style={{ top: "var(--clip-top)", height: "calc(100% - var(--clip-top))" }}
      >
        {/* SCROLLER - handles scrolling, scrollbar at viewport edge */}
        <div className="h-full overflow-y-auto overflow-x-hidden px-[clamp(1rem,4vw,3rem)]">
          <main className="flex flex-col items-center pt-4 pb-6 gap-4 sm:gap-6 px-4 max-w-[var(--content-max-width)] mx-auto">
            <OurLinks />
            <FreeResources />
            <RecentBlogs />
            <TechStack />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
