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

import { usePathname } from "next/navigation";

import { ThemeSwitch } from "./theme-switch";
import { Button } from "@heroui/button";
import { siteConfig } from "../config/site";
import { User } from "@heroui/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { checkUserExists } from "@/app/actions/actions";

export const Navbar = (props: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const session = useSession();

  useEffect(() => {
    setIsMenuOpen(false); // Close the navigation panel
  }, [pathname]);

  return (
    <div className="bg-background_navbar h-auto">
      <NextUINavbar
        classNames={{
          toggleIcon: ["text-white"],
        }}
        className="bg-inherit lg:py-1 shadow-lg"
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
            <div
              className="text-2xl cursor-pointer"
              onClick={() => router.push("/")}
            >
              Ascribe
            </div>
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
          {session.status == "authenticated" ? (
            <Dropdown>
              <DropdownTrigger>
                <User
                  isFocusable
                  className={"cursor-pointer transition-all"}
                  avatarProps={{
                    src: session.data?.user?.image || undefined,
                    fallback: null,
                    showFallback: true,
                  }}
                  description={session.data?.user?.email}
                  name={session.data?.user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Sign out action">
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button variant="bordered" onPress={() => signIn()}>
              Sign In
            </Button>
          )}
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
          <NavbarItem className="justify-center text-center">
            <Button onPress={() => signOut()}>Sign Out</Button>
          </NavbarItem>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
