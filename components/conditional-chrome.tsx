"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./sections/footer";
import {
  MobileTopBar,
  MobileTabBar,
  MobileSafeArea,
} from "./mobile-shell";
import { PageTransition } from "./page-transition";

/**
 * Two visual languages share one site:
 *   - **Mobile**: native-style shell — compact top bar + bottom tab nav, no
 *     marketing footer, no WebGL noise, page transitions on every route.
 *   - **Desktop**: full marketing site — animated navbar + footer.
 * Login/cadastro remain fullscreen takeovers on both.
 */
export function ConditionalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() || "";
  const fullscreen =
    path.startsWith("/login") || path.startsWith("/cadastro");

  if (fullscreen) {
    return <main className="relative">{children}</main>;
  }

  return (
    <>
      {/* desktop chrome */}
      <div className="hidden md:contents">
        <Navbar />
      </div>

      {/* mobile chrome */}
      <div className="md:hidden">
        <MobileTopBar />
      </div>

      {/* main scrollable region with route transitions */}
      <main className="relative pt-14 md:pt-0">
        <PageTransition>{children}</PageTransition>
      </main>

      <MobileSafeArea />

      {/* footer only on desktop — mobile uses bottom nav instead */}
      <div className="hidden md:contents">
        <Footer />
      </div>

      <MobileTabBar />
    </>
  );
}
