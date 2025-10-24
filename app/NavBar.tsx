import Link from "next/link";
import React from "react";
import Image from "next/image";

const NavBar = () => {
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
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
