import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAASPP Practice Test + Minemath",
  description: "Practice test for California state assessments with scoring, feedback, and a Minecraft-inspired math game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
