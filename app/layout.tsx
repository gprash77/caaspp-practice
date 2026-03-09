import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAASPP Practice Test",
  description: "Practice test for California state assessments (CAASPP/Smarter Balanced) with scoring and feedback",
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
