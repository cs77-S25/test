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
            <div className="dark:bg-sidebar_background col-start-1 absolute top-10 left-0 px-5 w-1/6"> {/* Okay, first, this has to be the weirdest comment syntax ever*/}
            {/* Now, more importantly, this is the div that controls our sidebar column/colors. It is actually not in sidebar. Within sidebar seems to only control components
            within the sidebar. Somehow, we need to figure out how to extend this column to the bottom of the screen with some padding so that it looks better. */}
              <Sidebar />
            </div>
            <div className="col-start-2 col-span-4  ">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
