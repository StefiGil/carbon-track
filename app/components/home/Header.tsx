"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Analysis" },
  { href: "/guide", label: "Guide" },
  { href: "/about", label: "Reports" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-surface border-b border-outline-variant">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">eco</span>
            <span className="text-lg font-semibold text-on-surface tracking-tight">
              EcoCalc Institutional
            </span>
          </div>
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
        </nav>
      </div>
    </header>
  );
}
