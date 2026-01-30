import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "LearnHub - AI-Powered Learning Platform",
    template: "%s | LearnHub",
  },
  description:
    "Empower your learning journey with AI-powered courses, gamification, and personalized learning paths.",
  keywords: [
    "learning management system",
    "online courses",
    "e-learning",
    "AI learning",
    "education platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
