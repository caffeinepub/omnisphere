import { Heart, Star, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Phone } from "../data/phones";
import { FALLBACK_IMAGE, PHONES_DATA } from "../data/phones";
import { QuickSpecsPopup } from "./QuickSpecsPopup";

const STAR_KEYS = ["t1", "t2", "t3", "t4", "t5"];

function useWishlistToggle(phoneId: string) {
  const [saved, setSaved] = useState(() => {
    try {
      const list: string[] = JSON.parse(
        localStorage.getItem("omni_wishlist") || "[]",
      );
      return list.includes(phoneId);
    } catch {
      return false;
    }
  });

  const toggle = () => {
    setSaved((prev) => {
      const list: string[] = JSON.parse(
        localStorage.getItem("omni_wishlist") || "[]",
      );
      const next = prev
        ? list.filter((id) => id !== phoneId)
        : [...list, phoneId];
      localStorage.setItem("omni_wishlist", JSON.stringify(next));
      return !prev;
    });
  };

  return { saved, toggle };
}

function TrendingCard({ phone, rank }: { phone: Phone; rank: number }) {
  const { saved, toggle } = useWishlistToggle(phone.id);
  const hasPriceDrop = phone.originalPrice > phone.priceValue;

  return (
    <div
      className="flex-shrink-0 w-52 bg-card border border-border rounded-2xl overflow-hidden snap-start hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      data-ocid={`phone_card.item.${rank}`}
    >
      <div className="relative">
        <img
          src={phone.imageUrl}
          alt={phone.name}
          crossOrigin="anonymous"
          className="w-full h-36 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="text-base">🔥</span>
          {phone.trending.isNewLaunch && (
            <span className="bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              New
            </span>
          )}
          {hasPriceDrop && !phone.trending.isNewLaunch && (
            <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              Drop
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={toggle}
          className="absolute top-2 right-2 p-1 rounded-full bg-background/80 backdrop-blur-sm"
          aria-label="Wishlist"
        >
          <Heart
            size={14}
            className={
              saved ? "text-red-500 fill-red-500" : "text-muted-foreground"
            }
          />
        </button>
      </div>
      <div className="p-3">
        <QuickSpecsPopup phone={phone}>
          <p className="font-semibold text-foreground text-sm leading-tight flex items-center gap-1">
            {phone.name}
            {phone.trending.priceTrend === "up" && (
              <TrendingUp size={12} className="text-red-500" />
            )}
            {phone.trending.priceTrend === "down" && (
              <TrendingDown size={12} className="text-green-500" />
            )}
          </p>
        </QuickSpecsPopup>
        <p className="text-primary font-bold text-sm mt-0.5">{phone.price}</p>
        <div className="flex items-center gap-0.5 mt-1">
          {STAR_KEYS.map((key, i) => (
            <Star
              key={key}
              size={10}
              className={
                i < Math.round(phone.rating)
                  ? "text-amber-400 fill-amber-400"
                  : "text-muted-foreground/30"
              }
            />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          👁 {phone.trending.viewsToday.toLocaleString("en-IN")} people viewed
          today
        </p>
      </div>
    </div>
  );
}

export function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trending = [...PHONES_DATA]
    .sort((a, b) => b.trending.viewsToday - a.trending.viewsToday)
    .slice(0, 5);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const cardWidth = 224;
    const interval = setInterval(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += cardWidth;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10" data-ocid="trending.section">
      <div className="container mx-auto px-4">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            🔥 Trending This Week
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sabse zyada dekhe gaye phones — aaj hi check karo
          </p>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {trending.map((phone, i) => (
            <TrendingCard key={phone.id} phone={phone} rank={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
