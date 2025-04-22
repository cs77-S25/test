import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import { NextAuthProvider } from "../components/providers/NextAuthProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
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
            <main className=" container mx-auto lg:mx-0 px-1 lg:px-7 lg:pt-5 justify-center items-center flex-grow max-w-full">
              <div className="">{children}</div>
            </main>
          </Providers>
        </body>
      </html>
    </NextAuthProvider>
  );
}
