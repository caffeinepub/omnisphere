import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Monitor, Star } from "lucide-react";
import type { Laptop } from "../data/laptops";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80";

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

interface LaptopCardProps {
  laptop: Laptop;
  index?: number;
}

export function LaptopCard({ laptop, index = 1 }: LaptopCardProps) {
  const hasPriceDrop = laptop.originalPrice > laptop.priceValue;

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
      data-ocid={`laptop_card.item.${index}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={laptop.imageUrl}
          alt={laptop.name}
          crossOrigin="anonymous"
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {laptop.comingSoon && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
          {!laptop.comingSoon && laptop.trending.isNewLaunch && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              New Launch
            </span>
          )}
          {!laptop.comingSoon && hasPriceDrop && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              Price Drop!
            </span>
          )}
        </div>
        {laptop.isRecommended && (
          <div className="absolute top-2 right-2">
            <Badge className="text-[10px] px-1.5 py-0.5 bg-primary/90 text-primary-foreground border-0">
              Editor&apos;s Pick
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-foreground text-base leading-tight">
            {laptop.name}
          </h3>
          <div className="mt-1">
            <StarRating rating={laptop.rating} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Cpu size={11} className="text-muted-foreground shrink-0" />
            <span className="text-[11px] text-muted-foreground truncate">
              {laptop.specs.processor}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[laptop.specs.ram, laptop.specs.storage].map((spec) => (
              <span
                key={spec}
                className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <Monitor size={11} className="text-muted-foreground shrink-0" />
            <span className="text-[11px] text-muted-foreground">
              {laptop.specs.display}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive size={11} className="text-muted-foreground shrink-0" />
            <span className="text-[11px] text-muted-foreground">
              {laptop.specs.weight} · {laptop.specs.battery}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-lg font-bold ${
              laptop.comingSoon
                ? "text-amber-600 dark:text-amber-400"
                : "text-foreground"
            }`}
          >
            {laptop.price}
          </span>
        </div>

        {laptop.comingSoon && laptop.expectedLaunch && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
            <span>Expected: {laptop.expectedLaunch}</span>
          </div>
        )}

        <div className="pt-2 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Expert Score</span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(laptop.expertScore / 10) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-foreground">
              {laptop.expertScore}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
