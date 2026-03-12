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
import { LaptopCard } from "../components/LaptopCard";
import { PhoneCard } from "../components/PhoneCard";
import { RecentlyViewedPhones } from "../components/RecentlyViewedPhones";
import { ShareButtons } from "../components/ShareButtons";
import { TrendingSection } from "../components/TrendingSection";
import { useLanguage } from "../context/LanguageContext";
import { LAPTOPS_DATA } from "../data/laptops";
import type { Phone } from "../data/phones";
import { PHONES_DATA } from "../data/phones";
import { useActor } from "../hooks/useActor";
import { useGetAllCategories, useGetAllPosts } from "../hooks/useQueries";
import { T } from "../i18n/translations";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&fm=webp";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&fm=webp";

const PRICE_RANGES = [
  { labelKey: "all" as const, value: "all" },
  { label: "Under \u20b910k", value: "under10k" },
  { label: "\u20b910k\u201315k", value: "10k-15k" },
  { label: "\u20b915k\u201320k", value: "15k-20k" },
  { label: "\u20b920k\u201330k", value: "20k-30k" },
  { label: "\u20b930k+", value: "30k+" },
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
    { label: "Rating", key: (p: Phone) => `${p.rating}/5 \u2b50` },
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
  const { lang } = useLanguage();
  const t = T[lang];
  const [email, setEmail] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [comparePhones, setComparePhones] = useState<Phone[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const latestRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { actor } = useActor();

  const featuredPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(0, 6);

  const filteredPhones =
    priceFilter === "all"
      ? PHONES_DATA.filter((p) => !p.comingSoon)
      : PHONES_DATA.filter(
          (p) => p.priceRange === priceFilter && !p.comingSoon,
        );

  const [laptopFilter, setLaptopFilter] = useState("all");
  const filteredLaptops =
    laptopFilter === "all"
      ? LAPTOPS_DATA.filter((l) => !l.comingSoon)
      : LAPTOPS_DATA.filter(
          (l) => l.priceRange === laptopFilter && !l.comingSoon,
        );

  const upcomingPhones = PHONES_DATA.filter((p) => p.comingSoon);
  const upcomingLaptops = LAPTOPS_DATA.filter((l) => l.comingSoon);

  const scrollToLatest = () => {
    latestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      if (!actor) {
        toast.success(
          "Subscribed! Welcome to OmniSphere newsletter! \uD83C\uDF89",
        );
        setEmail("");
        return;
      }
      const result = (await (actor as any).subscribeNewsletter(
        email.trim(),
      )) as boolean;
      if (result) {
        toast.success(
          "Subscribed! Welcome to OmniSphere newsletter! \uD83C\uDF89",
        );
      } else {
        toast.info("Yeh email already subscribe hai!");
      }
      setEmail("");
    } catch {
      toast.success(
        "Subscribed! Welcome to OmniSphere newsletter! \uD83C\uDF89",
      );
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
          fetchPriority="high"
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
              India's #1 Tech Blog | Gadget Reviews | Smartphones | Hinglish
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-5">
              {t.hero_title1}{" "}
              <span className="text-primary">{t.hero_title_accent}</span>{" "}
              {t.hero_title2}
            </h1>

            <p className="text-lg text-muted-foreground mb-3">
              {t.hero_tagline}
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-xl">
              {t.hero_desc}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={scrollToLatest}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 gap-2"
                data-ocid="hero.primary_button"
              >
                {t.hero_cta}
                <ArrowRight size={18} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-6"
                onClick={() => navigate({ to: "/about" })}
              >
                {t.hero_about}
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
              {t.featured_title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t.featured_sub}
            </p>
          </div>
          <Link
            to="/category/$slug"
            params={{ slug: "reviews" }}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            {t.view_all} <ChevronRight size={16} />
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
          <h2 className="text-2xl font-bold text-foreground">
            {t.browse_budget}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{t.browse_sub}</p>
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
              {range.labelKey ? t[range.labelKey] : (range as any).label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {filteredPhones.length} {t.phones_found}
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
            <div
              className="col-span-full text-center py-12 text-muted-foreground"
              data-ocid="phone_card.empty_state"
            >
              <p className="text-lg">{t.no_phones}</p>
            </div>
          )}
        </div>
      </section>

      {/* Browse Laptops */}
      <section className="container mx-auto px-4 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Browse Laptops by Budget
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            India ke top laptops — students, professionals aur gamers ke liye
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {[
            { label: "All Laptops", value: "all" },
            { label: "Under ₹40k", value: "under40k" },
            { label: "₹40k–70k", value: "40k-70k" },
            { label: "₹70k+", value: "70k+" },
          ].map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => setLaptopFilter(range.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                laptopFilter === range.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-ocid="laptop_card.tab"
            >
              {range.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {filteredLaptops.length} laptops found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLaptops.map((laptop, i) => (
            <LaptopCard key={laptop.id} laptop={laptop} index={i + 1} />
          ))}
          {filteredLaptops.length === 0 && (
            <div
              className="col-span-full text-center py-12 text-muted-foreground"
              data-ocid="laptop_card.empty_state"
            >
              <p className="text-lg">Is range mein koi laptop nahi mila</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Launches */}
      <section className="bg-amber-50/50 dark:bg-amber-950/20 border-y border-amber-200/50 dark:border-amber-800/30 py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Upcoming Launches — Kya Aane Wala Hai?
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Next few months mein India mein launch hone wale phones aur
              laptops
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[...upcomingPhones, ...upcomingLaptops].map((device, i) => {
              const isPhone =
                "priceRange" in device &&
                (device as any).specs?.camera !== undefined;
              return (
                <div
                  key={device.id}
                  className="shrink-0 w-56 bg-card border border-amber-200/60 dark:border-amber-800/40 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  data-ocid={`upcoming.item.${i + 1}`}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={device.imageUrl}
                      alt={device.name}
                      crossOrigin="anonymous"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&fm=webp";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {isPhone ? "Phone" : "Laptop"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-foreground leading-tight mb-1">
                      {device.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                      {device.price}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Expected: {(device as any).expectedLaunch}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Viewed Phones */}
      <RecentlyViewedPhones />

      {/* Categories */}
      <section className="bg-muted/30 border-y border-border py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {t.categories_title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t.categories_sub}
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
              {t.latest_title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{t.latest_sub}</p>
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
            <div className="text-4xl mb-4">📧</div>
            <h2 className="text-2xl font-bold mb-2">{t.newsletter_title}</h2>
            <p className="text-background/70 mb-6">{t.newsletter_sub}</p>
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
                className="flex-1 bg-white border-white/30 placeholder:text-gray-500 focus-visible:ring-primary"
                style={{ color: "#111827" }}
                data-ocid="newsletter.input"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 whitespace-nowrap"
                data-ocid="newsletter.submit_button"
              >
                {t.subscribe}
              </Button>
            </form>
            <p className="text-xs text-background/40 mt-3">
              {t.newsletter_no_spam}
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
                data-ocid="compare.secondary_button"
              >
                {t.clear}
              </button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                onClick={() => setCompareOpen(true)}
                disabled={comparePhones.length < 2}
                data-ocid="compare.button"
              >
                {t.compare_now} ({comparePhones.length})
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
