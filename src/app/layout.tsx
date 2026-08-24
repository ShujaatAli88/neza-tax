import type { Metadata } from "next";
import { fraunces, publicSans, plexMono } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BUSINESS } from "@/config/business";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nezafinancial.com"),
  title: {
    default: `${BUSINESS.brand} — Tax, Business, Insurance & Mortgage in Vista, CA`,
    template: `%s — ${BUSINESS.brand}`,
  },
  description:
    "Tax preparation, bookkeeping, payroll, insurance and home loans from one office in Vista. Free estimates, free e-file, and a guarantee: if you're not happy, you don't pay.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-[var(--mobile-bar-h)] lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
