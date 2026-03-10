import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Reviews", path: "/category/reviews" },
  { label: "Tips & Tricks", path: "/category/tips" },
  { label: "Comparisons", path: "/category/comparisons" },
  { label: "Gaming", path: "/category/gaming" },
  { label: "About", path: "/about" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/" });
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.08)] border-b border-transparent"
          : "bg-background border-b border-border"
      }`}
    >
      {/* Shrinking inner container */}
      <div
        className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ease-in-out ${
          scrolled ? "h-12" : "h-16"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 group"
          data-ocid="header.link"
        >
          <span
            className={`font-bold tracking-tight text-foreground transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            Omni
          </span>
          <span
            className={`font-bold tracking-tight text-primary transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            Sphere
          </span>
          <span
            className={`rounded-full bg-primary animate-pulse ml-0.5 transition-all duration-300 ${
              scrolled ? "w-1.5 h-1.5" : "w-2 h-2"
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              data-ocid="header.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-48 md:w-64 h-8 px-3 text-sm bg-muted border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                data-ocid="header.search_input"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="ml-2 p-1 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>
          )}

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
            data-ocid="header.toggle"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
