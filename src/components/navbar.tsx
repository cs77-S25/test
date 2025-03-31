"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

import { Image } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import InputIcon from "@mui/icons-material/Input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { usePathname } from "next/navigation";

import { ThemeSwitch } from "./theme-switch";
import { Button } from "@heroui/button";
import { siteConfig } from "../config/site";

export const Navbar = (props: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "all",
    });
  }

  useEffect(() => {
    setIsMenuOpen(false); // Close the navigation panel
  }, [pathname]);

  return (
    <div className="bg-background_navbar h-auto">
      <NextUINavbar
        classNames={{
          toggleIcon: ["text-white"],
        }}
        className="bg-inherit lg:py-1"
        maxWidth="full"
        position="sticky"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="lg:basis-full ">
          <NavbarBrand as="div" className="gap-2 lg:max-w-fit lg:mr-5 max-w-10">
            <Link
              className="flex justify-start items-center "
              href="/"

              //onPress={() => router.push("/")}
            >
              <div>
                <Image
                  src="ascribe.png"
                  width="50"
                  height="50"
                  className="h-9 lg:h-12"
                />
              </div>
            </Link>
          </NavbarBrand>

          <NavbarContent className="gap-4 flex-row hidden lg:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem isActive={pathname === item.href} key={item.href}>
                <Link
                  key={item.href}
                  color={pathname === item.href ? "secondary" : "foreground"}
                  className="text-lg dark"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
            {/*
            {session?.user.role == "admin" ? (
              <NavbarMenuItem isActive={pathname === "/admin"} key={"/admin"}>
                <Link
                  key={"/admin"}
                  color={pathname === "/admin" ? "secondary" : "foreground"}
                  className="text-lg dark"
                  onPress={() => {
                    cookies.set("pagePref", "/admin");
                  }}
                  href={"/admin"}
                >
                  Admin
                </Link>
              </NavbarMenuItem>
            ) : null}
             */}
          </NavbarContent>
        </NavbarContent>
        {pathname === "/" || pathname === "/profs" ? (
          <NavbarContent className="lg:basis-full lg:flex hidden lg:w-full"></NavbarContent>
        ) : null}

        <NavbarContent
          className="hidden lg:flex basis-1/5 lg:basis-full"
          justify="end"
        >
          <NavbarItem></NavbarItem>
          <NavbarItem className="hidden lg:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile?*/}

        <NavbarContent className="flex lg:hidden" justify="end">
          <ThemeSwitch />

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarMenu className="lg:flex">
          <div className="mx-4 mt-5 flex flex-col  text-center text-6xl">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  key={item.href}
                  color={pathname === item.href ? "secondary" : "foreground"}
                  className="text-lg dark w-full"
                  href={item.href}
                  size="lg"
                >
                  <div className="text-4xl">{item.label}</div>
                </Link>
              </NavbarMenuItem>
            ))}

            {/*
            {session?.user.role == "admin" ? (
              <NavbarMenuItem isActive={pathname === "/admin"} key={"/admin"}>
                <Link
                  key={"/admin"}
                  color={pathname === "/admin" ? "secondary" : "foreground"}
                  className="text-lg dark w-full"
                  onPress={() => {
                    cookies.set("pagePref", "/admin");
                  }}
                  href={"/admin"}
                  size="lg"
                >
                  <div className="text-4xl">Admin</div>
                </Link>
              </NavbarMenuItem>
            ) : null}
             */}
          </div>
          <NavbarItem className="justify-center text-center"></NavbarItem>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
