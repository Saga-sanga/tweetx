import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TweetX",
  description: "The micro micro blogging site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
        <Toaster />
      </html>
    </ReactQueryProvider>
  );
}
