import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "WH40K Copilot",
  description: "Statistics battle-calculator for Warhammer 40K",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-800">
      <body>{children}</body>
    </html>
  );
}
