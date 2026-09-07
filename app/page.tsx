import { Hero } from "@/components/sections/hero";
import { MegaMarquee } from "@/components/sections/mega-marquee";
import { Stories } from "@/components/sections/stories";
import { Ranking } from "@/components/sections/ranking";
import { Featured } from "@/components/sections/featured";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { Stats } from "@/components/sections/stats";
import { HowItWorks } from "@/components/sections/how-it-works";
import { MapPreview } from "@/components/sections/map-preview";
import { Calendar } from "@/components/sections/calendar";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

/**
 * Mobile vs desktop is a different product: mobile users want a feed
 * (discover → vote → go), desktop marketing visitors want the full pitch.
 * `DesktopOnly` wraps marketing-only blocks so they collapse to nothing on
 * narrow screens, keeping the mobile home compact and scannable.
 */
function DesktopOnly({ children }: { children: React.ReactNode }) {
  return <div className="hidden md:block">{children}</div>;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stories />
      <DesktopOnly>
        <MegaMarquee />
      </DesktopOnly>
      <Ranking />
      <DesktopOnly>
        <Stats />
      </DesktopOnly>
      <PhotoStrip />
      <Featured />
      <DesktopOnly>
        <HowItWorks />
      </DesktopOnly>
      <MapPreview />
      <Calendar />
      <DesktopOnly>
        <Pricing />
      </DesktopOnly>
      <DesktopOnly>
        <Testimonials />
      </DesktopOnly>
      <DesktopOnly>
        <CTA />
      </DesktopOnly>
    </>
  );
}
