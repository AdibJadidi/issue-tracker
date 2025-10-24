"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classNames from "classnames";
const NavBar = () => {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className="flex h-16 items-center space-x-6 border-b border-gray-200 px-4">
      <Link href="/">
        <Image
          src="/icons/IssueTrackerIcon.svg"
          alt="Issue Tracker"
          width={32}
          height={32}
          priority
        />
      </Link>
      <ul className="flex space-x-3">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames(" hover:text-zinc-800 transition-colors", {
              "text-zinc-900": pathname === link.href,
              "text-zinc-500": pathname !== link.href,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
