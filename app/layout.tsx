import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import { WebGLBackground } from "@/components/webgl-background";
import { ConditionalChrome } from "@/components/conditional-chrome";
import { Toaster } from "@/components/toast";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { InstallPrompt } from "@/components/install-prompt";
import { Onboarding } from "@/components/onboarding";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PartyRank — O ranking das festas de SP",
  description:
    "Universitárias, clubs, raves e eventos. Ranking ao vivo, placar das ligas e ingressos pras melhores festas de São Paulo.",
  applicationName: "PartyRank",
  appleWebApp: {
    capable: true,
    title: "PartyRank",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: "PartyRank",
    description: "O ranking das festas de SP — universitárias, clubs, raves e eventos.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable} ${serif.variable}`}>
      <body className="relative min-h-screen bg-background font-sans text-foreground">
        <WebGLBackground />
        <CustomCursor />
        <SmoothScroll>
          <ConditionalChrome>{children}</ConditionalChrome>
        </SmoothScroll>
        <Toaster />
        <ServiceWorkerRegister />
        <InstallPrompt />
        <Onboarding />
      </body>
    </html>
  );
}
