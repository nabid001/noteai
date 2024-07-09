import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note Ai",
  description:
    "NoteAi is a platform where you can take notes while you are studying. NoteAi supports multiple languages.",
  openGraph: {
    images: [
      {
        url: "/assets/images/study.jpg",
        width: 1200,
        height: 630,
        alt: "Note AI study image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>{children}</ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
