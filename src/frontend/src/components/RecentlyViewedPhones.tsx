import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { FALLBACK_IMAGE, PHONES_DATA } from "../data/phones";
import type { Phone } from "../data/phones";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {["s1", "s2", "s3", "s4", "s5"].map((key, i) => (
        <Star
          key={key}
          size={10}
          className={
            i < Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

export function RecentlyViewedPhones() {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(
        localStorage.getItem("omni_recently_viewed") || "[]",
      );
      const found = ids
        .map((id) => PHONES_DATA.find((p) => p.id === id))
        .filter(Boolean) as Phone[];
      setPhones(found);
    } catch {}
  }, []);

  if (phones.length === 0) return null;

  return (
    <section
      className="container mx-auto px-4 py-10"
      data-ocid="recently_viewed.section"
    >
      <h2 className="text-xl font-bold text-foreground mb-5">
        Recently Viewed
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {phones.map((phone, i) => (
          <Link
            key={phone.id}
            to="/"
            className="shrink-0 w-40 bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            data-ocid={`recently_viewed.item.${i + 1}`}
          >
            <img
              src={phone.imageUrl}
              alt={phone.name}
              crossOrigin="anonymous"
              className="w-full h-20 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            <div className="p-2.5">
              <p className="text-xs font-semibold text-foreground truncate leading-tight">
                {phone.name}
              </p>
              <StarRating rating={phone.rating} />
              <p className="text-xs font-bold text-primary mt-1">
                {phone.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
