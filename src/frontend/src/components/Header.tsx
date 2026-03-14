import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Mic, Moon, Search, Sun, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { PHONES_DATA } from "../data/phones";
import { useTheme } from "../hooks/useTheme";
import { T } from "../i18n/translations";

const NAV_PATHS = [
  { key: "nav_home" as const, path: "/" },
  { key: "nav_reviews" as const, path: "/category/reviews" },
  { key: "nav_tips" as const, path: "/category/tips" },
  { key: "nav_comparisons" as const, path: "/category/comparisons" },
  { key: "nav_gaming" as const, path: "/category/gaming" },
  { key: "nav_about" as const, path: "/about" },
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
  const { lang, toggleLang } = useLanguage();
  const t = T[lang];
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
          sublabel: `${p.price} \u2022 ${p.specs.ram}`,
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

  const navigateToPhone = (phoneId: string | undefined) => {
    const phone = PHONES_DATA.find((p) => p.id === phoneId);
    if (phone?.reviewSlug) {
      navigate({ to: "/article/$slug", params: { slug: phone.reviewSlug } });
    } else {
      navigate({ to: "/category/$slug", params: { slug: "reviews" } });
    }
  };

  const handleSelect = (result: SearchResult) => {
    saveRecentSearch(result.label);
    setDropdownOpen(false);
    setSearchQuery("");
    setSearchOpen(false);
    if (result.type === "phone") {
      navigateToPhone(result.id);
    } else if (result.type === "category") {
      navigate({
        to: "/category/$slug",
        params: { slug: result.label.toLowerCase() },
      });
    } else {
      // For recent/popular, set the query and re-search
      setSearchQuery(result.label);
      setDropdownOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!dropdownOpen) setDropdownOpen(true);
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      } else if (searchQuery.trim()) {
        // No item highlighted — navigate based on query results
        setDropdownOpen(false);
        setSearchQuery("");
        setSearchOpen(false);
        const phoneResult = results.find((r) => r.type === "phone");
        if (phoneResult) {
          navigateToPhone(phoneResult.id);
        } else {
          const catResult = results.find((r) => r.type === "category");
          if (catResult) {
            navigate({
              to: "/category/$slug",
              params: { slug: catResult.label.toLowerCase() },
            });
          } else {
            navigate({ to: "/category/$slug", params: { slug: "reviews" } });
          }
        }
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setSearchOpen(false);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setDropdownOpen(true);
    };
    recognition.onerror = () => {};
    recognition.start();
  };

  const typeIcon = (type: SearchResult["type"]) => {
    if (type === "phone") return "\ud83d\udcf1";
    if (type === "category") return "\ud83d\udcc2";
    if (type === "recent") return "\ud83d\udd52";
    return "\ud83d\udd25";
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
          {NAV_PATHS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              data-ocid="header.link"
            >
              {t[link.key]}
            </Link>
          ))}
          <Link
            to="/wishlist"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-1"
            data-ocid="header.link"
          >
            <Heart size={14} /> {t.nav_wishlist}
          </Link>
          <Link
            to="/hire-us"
            className="text-sm font-semibold px-4 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            data-ocid="header.hire_us.link"
          >
            Hire Us
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
              placeholder={t.search_placeholder}
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
                      {t.recent_searches}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-border text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            aria-label="Toggle language"
            data-ocid="header.toggle"
          >
            {lang === "en" ? "\u0939\u093f\u0902" : "EN"}
          </button>
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
                setActiveIndex(-1);
              }}
              onFocus={() => setDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={t.search_placeholder}
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
            {NAV_PATHS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                data-ocid="header.link"
              >
                {t[link.key]}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted transition-colors flex items-center gap-2"
              data-ocid="header.link"
            >
              <Heart size={14} /> {t.nav_wishlist}
            </Link>
            <Link
              to="/hire-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors text-center mt-1"
              data-ocid="header.hire_us.link"
            >
              Hire Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
