import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Phone } from "../data/phones";
import { FALLBACK_IMAGE } from "../data/phones";
import { ExpertScore } from "./ExpertScore";
import { LivePriceTracker } from "./LivePriceTracker";
import { QuickSpecsPopup } from "./QuickSpecsPopup";

function useWishlist(phoneId: string) {
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
      let next: string[];
      if (prev) {
        next = list.filter((id) => id !== phoneId);
      } else {
        next = [...list, phoneId];
      }
      localStorage.setItem("omni_wishlist", JSON.stringify(next));
      return !prev;
    });
  };

  return { saved, toggle };
}

function saveRecentlyViewed(id: string) {
  try {
    const list: string[] = JSON.parse(
      localStorage.getItem("omni_recently_viewed") || "[]",
    );
    const next = [id, ...list.filter((i) => i !== id)].slice(0, 6);
    localStorage.setItem("omni_recently_viewed", JSON.stringify(next));
  } catch {}
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_KEYS.map((key, i) => (
        <Star
          key={key}
          size={12}
          className={
            i < Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : i < rating
                ? "text-amber-400 fill-amber-400/50"
                : "text-muted-foreground/40"
          }
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

interface PhoneCardProps {
  phone: Phone;
  onCompareToggle?: (phone: Phone) => void;
  isInCompare?: boolean;
  index?: number;
}

export function PhoneCard({
  phone,
  onCompareToggle,
  isInCompare = false,
  index = 1,
}: PhoneCardProps) {
  const { saved, toggle: toggleWishlist } = useWishlist(phone.id);
  const hasPriceDrop = phone.originalPrice > phone.priceValue;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: card click tracks recently viewed, not primary action
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
      data-ocid={`phone_card.item.${index}`}
      onClick={() => saveRecentlyViewed(phone.id)}
    >
      <div className="relative overflow-hidden">
        <img
          src={phone.imageUrl}
          alt={phone.name}
          crossOrigin="anonymous"
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-2 left-2">
          {phone.trending.isNewLaunch ? (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              New Launch
            </span>
          ) : hasPriceDrop ? (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Price Drop!
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={16}
            className={
              saved ? "text-red-500 fill-red-500" : "text-muted-foreground"
            }
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <QuickSpecsPopup phone={phone}>
            <h3 className="font-bold text-foreground text-base leading-tight">
              {phone.name}
            </h3>
          </QuickSpecsPopup>
          <div className="mt-1">
            <StarRating rating={phone.rating} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[phone.specs.ram, phone.specs.camera, phone.specs.battery].map(
            (spec) => (
              <span
                key={spec}
                className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
              >
                {spec}
              </span>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            {phone.price}
          </span>
          {hasPriceDrop && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{phone.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <LivePriceTracker phone={phone} />

        <div className="pt-2 border-t border-border">
          <ExpertScore phone={phone} compact />
        </div>

        {onCompareToggle && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only, not primary action
          <div
            className="flex items-center gap-2 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              id={`compare-${phone.id}`}
              checked={isInCompare}
              onCheckedChange={() => onCompareToggle(phone)}
              className="border-border"
            />
            <label
              htmlFor={`compare-${phone.id}`}
              className="text-xs text-muted-foreground cursor-pointer select-none"
            >
              + Compare
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
