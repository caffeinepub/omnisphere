import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Mic, Moon, Search, Sun, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PHONES_DATA } from "../data/phones";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Reviews", path: "/category/reviews" },
  { label: "Tips & Tricks", path: "/category/tips" },
  { label: "Comparisons", path: "/category/comparisons" },
  { label: "Gaming", path: "/category/gaming" },
  { label: "About", path: "/about" },
];

const POPULAR_SEARCHES = [
  "Best phones under 15000",
  "5G phones 2026",
  "Camera phones",
  "Gaming phones",
  "Battery life phones",
];

const CATEGORIES = [
  "Phones",
  "Laptops",
  "Tips",
  "Reviews",
  "Gaming",
  "Comparisons",
];

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem("omni_recent_searches") || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(q: string) {
  const recent = getRecentSearches().filter((r) => r !== q);
  recent.unshift(q);
  localStorage.setItem(
    "omni_recent_searches",
    JSON.stringify(recent.slice(0, 5)),
  );
}

function parseSpecQuery(q: string) {
  const lower = q.toLowerCase();
  const ramMatch = lower.match(/(\d+)gb\s*ram/);
  const priceMatch = lower.match(/under\s*([\d,]+)/);
  const ram = ramMatch ? `${ramMatch[1]}GB` : null;
  const maxPrice = priceMatch ? Number(priceMatch[1].replace(",", "")) : null;
  return { ram, maxPrice };
}

interface SearchResult {
  type: "phone" | "category" | "recent" | "popular";
  label: string;
  sublabel?: string;
  id?: string;
}

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getResults = useCallback((): SearchResult[] => {
    const q = searchQuery.trim().toLowerCase();
    const results: SearchResult[] = [];

    if (!q) {
      const recent = getRecentSearches();
      for (const r of recent) results.push({ type: "recent", label: r });
      for (const p of POPULAR_SEARCHES)
        results.push({ type: "popular", label: p });
      return results;
    }

    const { ram, maxPrice } = parseSpecQuery(q);
    if (ram || maxPrice) {
      const matching = PHONES_DATA.filter((p) => {
        const ramOk = ram
          ? p.specs.ram.toLowerCase().includes(ram.toLowerCase())
          : true;
        const priceOk = maxPrice ? p.priceValue <= maxPrice : true;
        return ramOk && priceOk;
      });
      for (const p of matching)
        results.push({
          type: "phone",
          label: p.name,
          sublabel: `${p.price} • ${p.specs.ram}`,
          id: p.id,
        });
      return results.slice(0, 8);
    }

    for (const p of PHONES_DATA.filter((p) => p.name.toLowerCase().includes(q)))
      results.push({
        type: "phone",
        label: p.name,
        sublabel: p.price,
        id: p.id,
      });

    for (const c of CATEGORIES.filter((c) => c.toLowerCase().includes(q)))
      results.push({ type: "category", label: c });

    for (const p of POPULAR_SEARCHES.filter((p) => p.toLowerCase().includes(q)))
      results.push({ type: "popular", label: p });

    return results.slice(0, 8);
  }, [searchQuery]);

  const results = getResults();

  const handleSelect = (result: SearchResult) => {
    saveRecentSearch(result.label);
    setDropdownOpen(false);
    setSearchQuery("");
    if (result.type === "phone") {
      const phone = PHONES_DATA.find((p) => p.id === result.id);
      if (phone) toast.info(`Opening ${phone.name}...`);
    } else if (result.type === "category") {
      navigate({
        to: "/category/$slug",
        params: { slug: result.label.toLowerCase() },
      });
    } else {
      setSearchQuery(result.label);
      setDropdownOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!dropdownOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice search not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setDropdownOpen(true);
    };
    recognition.onerror = () => toast.error("Voice search failed");
    recognition.start();
    toast.info("🎤 Listening...");
  };

  const typeIcon = (type: SearchResult["type"]) => {
    if (type === "phone") return "📱";
    if (type === "category") return "📂";
    if (type === "recent") return "🕒";
    return "🔥";
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.08)] border-b border-transparent"
          : "bg-background border-b border-border"
      }`}
    >
      <div
        className={`container mx-auto px-4 flex items-center justify-between gap-3 transition-all duration-300 ease-in-out ${
          scrolled ? "h-12" : "h-16"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 group shrink-0"
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

        <nav className="hidden lg:flex items-center gap-5 shrink-0">
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
          <Link
            to="/wishlist"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-1"
            data-ocid="header.link"
          >
            <Heart size={14} /> Wishlist
          </Link>
        </nav>

        {/* Smart Search */}
        <div className="relative flex-1 max-w-xs hidden md:block">
          <div className="relative flex items-center">
            <Search
              size={14}
              className="absolute left-3 text-muted-foreground pointer-events-none"
            />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDropdownOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search phones, specs..."
              className="w-full h-9 pl-8 pr-8 text-sm bg-muted border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              data-ocid="search.search_input"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute right-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Voice search"
            >
              <Mic size={13} />
            </button>
          </div>

          {dropdownOpen && results.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
              style={{
                opacity: dropdownOpen ? 1 : 0,
                transform: dropdownOpen ? "translateY(0)" : "translateY(-4px)",
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
              data-ocid="search.dropdown"
            >
              {results.map((result, i) => (
                <button
                  key={`${result.type}-${result.label}`}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors ${
                    i === activeIndex ? "bg-muted" : ""
                  }`}
                  onMouseDown={() => handleSelect(result)}
                >
                  <span className="text-base">{typeIcon(result.type)}</span>
                  <span className="flex-1 truncate">
                    <span className="text-foreground">{result.label}</span>
                    {result.sublabel && (
                      <span className="text-muted-foreground text-xs ml-2">
                        {result.sublabel}
                      </span>
                    )}
                  </span>
                  {result.type === "recent" && (
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      Recent
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle search"
          >
            <Search size={18} />
          </button>
          <Link
            to="/wishlist"
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            data-ocid="header.link"
          >
            <Heart size={18} />
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
            data-ocid="header.toggle"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <Search
              size={14}
              className="absolute left-3 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search phones..."
              className="w-full h-9 pl-8 pr-8 text-sm bg-muted border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              data-ocid="search.search_input"
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute right-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Voice search"
            >
              <Mic size={13} />
            </button>
          </div>
          {dropdownOpen && results.length > 0 && (
            <div
              className="mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
              data-ocid="search.dropdown"
            >
              {results.map((result, i) => (
                <button
                  key={`${result.type}-${result.label}`}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted ${
                    i === activeIndex ? "bg-muted" : ""
                  }`}
                  onMouseDown={() => handleSelect(result)}
                >
                  <span>{typeIcon(result.type)}</span>
                  <span className="flex-1 truncate">{result.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
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
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              data-ocid="header.link"
            >
              <Heart size={14} /> My Wishlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
