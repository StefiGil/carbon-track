"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/analysis", label: "Analysis" },
  { href: "/about", label: "About" },
  // { href: "/reports", label: "Reports" }, // requires auth
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-surface border-b border-outline-variant">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-2xl">eco</span>
            <span className="text-lg font-semibold text-on-surface tracking-tight">
              CarbonTrack Institutional
            </span>
          </Link>
          <div className="hidden sm:block h-6 w-px bg-outline-variant" />
        </div>
        <nav className="flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`tracking-widest uppercase text-xs transition-colors duration-200 ${
                  active
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant font-medium hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="w-px h-4 bg-outline-variant ml-4" />
          <button className="text-on-surface-variant text-sm font-normal normal-case tracking-normal hover:text-primary transition-colors duration-200">
            Sign in
          </button>
        </nav>
      </div>
    </header>
  );
}
