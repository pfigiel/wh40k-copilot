import "./globals.css";
import { Nav } from "./layout/components/nav";
import "./reset.css";
import type { Metadata } from "next";

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
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
