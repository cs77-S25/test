import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ascribe",
  description: "The next generation of collborative note-taking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable
        )}
      >
        <Providers
          themeProps={{
            children: children,
            attribute: "class",
            defaultTheme: "dark",
          }}
        >
          <Navbar />
          <main className="grid grid-cols-5 gap-5 container mx-auto lg:mx-0 px-1 lg:px-7 lg:pt-5 justify-center items-center flex-grow max-w-full">
            <div className="col-start-1 absolute top-10 left-0 px-5 w-1/6">
              <Sidebar />
            </div>
            <div className="col-start-2 col-span-4  ">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
