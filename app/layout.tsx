import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "./components/motion";
import "./globals.css";

// Self-hosted by next/font: no render-blocking request to Google at runtime.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const title = "Vloid — Let AI make your follow-up calls";
const description =
  "Vloid calls your customer list, asks what you need to know, and hands you structured results back — no agents dialing one by one. Join the early-access waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vloid.clientra.tech"),
  title,
  description,
  keywords: [
    "AI voice agent",
    "outbound calling",
    "customer follow-up",
    "renewal reminders",
    "feedback collection",
    "call automation",
  ],
  openGraph: {
    title,
    description,
    url: "https://vloid.clientra.tech",
    siteName: "Vloid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
