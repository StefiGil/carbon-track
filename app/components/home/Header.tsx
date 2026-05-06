import Link from "next/link";

export default function Header() {
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
          <Link
            href="/"
            className="text-primary font-semibold tracking-widest uppercase text-xs transition-colors duration-200"
          >
            Analysis
          </Link>
          <Link
            href="/about"
            className="text-on-surface-variant hover:text-primary font-medium tracking-widest uppercase text-xs transition-colors duration-200"
          >
            Guide
          </Link>
          <Link
            href="/guide"
            className="text-on-surface-variant hover:text-primary font-medium tracking-widest uppercase text-xs transition-colors duration-200"
          >
            Reports
          </Link>
        </nav>
      </div>
    </header>
  );
}
