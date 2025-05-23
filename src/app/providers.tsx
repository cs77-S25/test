"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";

import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

//import { ThemeProviderProps } from "next-themes/dist/types";
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

// Only if using TypeScript
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
