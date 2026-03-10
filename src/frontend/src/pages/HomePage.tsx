import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ArticleCard } from "../components/ArticleCard";
import { DealOfTheDay } from "../components/DealOfTheDay";
import { EmiCalculator } from "../components/EmiCalculator";
import { PhoneCard } from "../components/PhoneCard";
import { ShareButtons } from "../components/ShareButtons";
import { TrendingSection } from "../components/TrendingSection";
import type { Phone } from "../data/phones";
import { PHONES_DATA } from "../data/phones";
import { useGetAllCategories, useGetAllPosts } from "../hooks/useQueries";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80";

const PRICE_RANGES = [
  { label: "All", value: "all" },
  { label: "Under ₹10k", value: "under10k" },
  { label: "₹10k–15k", value: "10k-15k" },
  { label: "₹15k–20k", value: "15k-20k" },
  { label: "₹20k–30k", value: "20k-30k" },
  { label: "₹30k+", value: "30k+" },
];

function CompareModal({
  phones,
  open,
  onClose,
}: {
  phones: Phone[];
  open: boolean;
  onClose: () => void;
}) {
  const specRows = [
    { label: "Price", key: (p: Phone) => p.price },
    { label: "Display", key: (p: Phone) => p.specs.display },
    { label: "Processor", key: (p: Phone) => p.specs.processor },
    { label: "RAM", key: (p: Phone) => p.specs.ram },
    { label: "Camera", key: (p: Phone) => p.specs.camera },
    { label: "Battery", key: (p: Phone) => p.specs.battery },
    { label: "Expert Score", key: (p: Phone) => `${p.expertScore}/10` },
    { label: "Rating", key: (p: Phone) => `${p.rating}/5 ⭐` },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Phone Comparison</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Spec</TableHead>
                {phones.map((p) => (
                  <TableHead key={p.id}>{p.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {specRows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium text-muted-foreground text-xs">
                    {row.label}
                  </TableCell>
                  {phones.map((p) => (
                    <TableCell key={p.id} className="text-sm">
                      {row.key(p)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="pt-2">
          <ShareButtons phones={phones} context="compare" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function HomePage() {
  const { data: posts = [] } = useGetAllPosts();
  const { data: categories = [] } = useGetAllCategories();
  const [email, setEmail] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [comparePhones, setComparePhones] = useState<Phone[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const latestRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const featuredPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(0, 6);

  const filteredPhones =
    priceFilter === "all"
      ? PHONES_DATA
      : PHONES_DATA.filter((p) => p.priceRange === priceFilter);

  const scrollToLatest = () => {
    latestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Subscribed! Welcome to OmniSphere newsletter! 🎉");
      setEmail("");
    }
  };

  const handleCompareToggle = (phone: Phone) => {
    setComparePhones((prev) => {
      if (prev.find((p) => p.id === phone.id)) {
        return prev.filter((p) => p.id !== phone.id);
      }
      if (prev.length >= 3) {
        toast.error("Maximum 3 phones compare kar sakte hain");
        return prev;
      }
      return [...prev, phone];
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={HERO_IMAGE}
          alt="Tech background"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-[0.07]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              India ka #1 Hinglish Tech Blog
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-5">
              Tech Ki Duniya, <span className="text-primary">Hinglish</span>{" "}
              Mein
            </h1>

            <p className="text-lg text-muted-foreground mb-3">
              India ka Best Hinglish Tech Blog
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-xl">
              Smartphones, Laptops, Reviews aur bahut kuch — simple Hinglish
              mein, jo sabko samajh aaye.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={scrollToLatest}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 gap-2"
                data-ocid="hero.primary_button"
              >
                Latest Articles
                <ArrowRight size={18} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-6"
                onClick={() => navigate({ to: "/about" })}
              >
                About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Featured Posts
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Editor ki top picks — must read articles
            </p>
          </div>
          <Link
            to="/category/$slug"
            params={{ slug: "reviews" }}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post, i) => (
            <Link
              key={post.slug}
              to="/article/$slug"
              params={{ slug: post.slug }}
            >
              <ArticleCard
                post={post}
                variant="featured"
                data-ocid={`featured.item.${i + 1}` as any}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <TrendingSection />

      {/* Deal of the Day */}
      <DealOfTheDay />

      {/* Browse Phones */}
      <section className="container mx-auto px-4 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Browse Phones</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Compare, save aur best phone dhundho
          </p>
        </div>

        {/* Price filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => setPriceFilter(range.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                priceFilter === range.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-ocid="phone_card.tab"
            >
              {range.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {filteredPhones.length} phone{filteredPhones.length !== 1 ? "s" : ""}{" "}
          found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map((phone, i) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              index={i + 1}
              onCompareToggle={handleCompareToggle}
              isInCompare={!!comparePhones.find((p) => p.id === phone.id)}
            />
          ))}
          {filteredPhones.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p className="text-lg">No phones found in this range</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 border-y border-border py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Browse by Category
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Apni favourite category choose karo
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="group flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200"
                data-ocid={`categories.item.${i + 1}`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section
        ref={latestRef}
        className="container mx-auto px-4 py-14"
        id="latest"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Latest Articles
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sabse fresh content — aaj hi padho
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <Link
              key={post.slug}
              to="/article/$slug"
              params={{ slug: post.slug }}
            >
              <ArticleCard
                post={post}
                data-ocid={`latest.item.${i + 1}` as any}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* EMI Calculator */}
      <EmiCalculator />

      {/* Newsletter */}
      <section className="bg-foreground text-background py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-2xl font-bold mb-2">Stay Updated!</h2>
            <p className="text-background/70 mb-6">
              Latest tech articles, reviews aur tips directly aapke inbox mein —
              bilkul free!
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="aapka@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-primary"
                data-ocid="newsletter.input"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 whitespace-nowrap"
                data-ocid="newsletter.submit_button"
              >
                Subscribe 🚀
              </Button>
            </form>
            <p className="text-xs text-background/40 mt-3">
              No spam. Kabhi bhi unsubscribe kar sakte hain.
            </p>
          </div>
        </div>
      </section>

      {/* Compare sticky bar */}
      {comparePhones.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-xl px-4 py-3"
          data-ocid="compare.panel"
        >
          <div className="container mx-auto flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-foreground">
                Compare:
              </span>
              {comparePhones.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {p.name}
                  <button
                    type="button"
                    onClick={() => handleCompareToggle(p)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setComparePhones([])}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                onClick={() => setCompareOpen(true)}
                disabled={comparePhones.length < 2}
                data-ocid="compare.button"
              >
                Compare Now ({comparePhones.length})
              </Button>
            </div>
          </div>
        </div>
      )}

      <CompareModal
        phones={comparePhones}
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
      />
    </main>
  );
}
