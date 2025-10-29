"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className=" border-b border-gray-200 px-4 py-3">
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap={"3"}>
            <Link href="/">
              <Image
                src="/icons/IssueTrackerIcon.svg"
                alt="Issue Tracker"
                width={32}
                height={32}
                priority
              />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={classNames(
                    " hover:text-zinc-800 transition-colors",
                    {
                      "text-zinc-900": pathname === link.href,
                      "text-zinc-500": pathname !== link.href,
                    }
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session?.user!.image!}
                    fallback={session?.user!.name!}
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session?.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className="cursor-pointer">
                    <Link href="/api/auth/signout">
                      <Text size="2">Sign out</Text>
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
