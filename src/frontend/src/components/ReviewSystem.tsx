import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  pros: string;
  cons: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  date: string;
}

const SEED_REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Rohit Kumar",
    rating: 5,
    text: "Bahut acha phone hai! Performance top notch hai aur camera bhi kafi achha hai.",
    pros: "Fast performance, Good camera",
    cons: "Battery thoda aur honi chahiye thi",
    verified: true,
    helpful: 24,
    unhelpful: 2,
    date: "2026-02-10",
  },
  {
    id: "r2",
    name: "Priya Sharma",
    rating: 4,
    text: "Overall ek solid phone hai. Paise vasool hai definitely.",
    pros: "Value for money, Good display",
    cons: "No headphone jack",
    verified: false,
    helpful: 18,
    unhelpful: 1,
    date: "2026-01-25",
  },
  {
    id: "r3",
    name: "Aman Singh",
    rating: 3,
    text: "Theek thak hai. Expected se thoda kam laga honestly.",
    pros: "Good build quality",
    cons: "Camera average in low light, Heating issue",
    verified: true,
    helpful: 9,
    unhelpful: 4,
    date: "2026-01-15",
  },
];

function Stars({
  rating,
  interactive = false,
  onSelect,
}: { rating: number; interactive?: boolean; onSelect?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!interactive}
          className={`text-xl transition-colors ${
            s <= (interactive ? hover || rating : rating)
              ? "text-yellow-400"
              : "text-muted-foreground/30"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"} bg-transparent border-none p-0`}
          onClick={() => interactive && onSelect?.(s)}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

type SortType = "recent" | "helpful" | "highest";

function getStorageKey(slug: string) {
  return `reviews_${slug}`;
}

export interface ReviewSystemProps {
  articleSlug: string;
}

export function ReviewSystem({ articleSlug }: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sort, setSort] = useState<SortType>("recent");
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    text: "",
    pros: "",
    cons: "",
    verified: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(articleSlug));
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      setReviews(SEED_REVIEWS);
    }
  }, [articleSlug]);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem(getStorageKey(articleSlug), JSON.stringify(updated));
  };

  const sorted = [...reviews].sort((a, b) => {
    if (sort === "recent")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "helpful") return b.helpful - a.helpful;
    return b.rating - a.rating;
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleThumb = (id: string, type: "helpful" | "unhelpful") => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, [type]: r[type] + 1 } : r,
    );
    saveReviews(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.rating === 0 || !form.text.trim()) {
      toast.error("Naam, rating aur review text zaroori hai!");
      return;
    }
    const newReview: Review = {
      id: `r${Date.now()}`,
      name: form.name,
      rating: form.rating,
      text: form.text,
      pros: form.pros,
      cons: form.cons,
      verified: form.verified,
      helpful: 0,
      unhelpful: 0,
      date: new Date().toISOString().split("T")[0],
    };
    saveReviews([newReview, ...reviews]);
    setForm({
      name: "",
      rating: 0,
      text: "",
      pros: "",
      cons: "",
      verified: false,
    });
    toast.success("Review submit ho gaya! Shukriya 🙏");
  };

  return (
    <section
      data-ocid="reviews.section"
      className="mt-12 pt-8 border-t border-border"
    >
      <h2 className="text-2xl font-bold text-foreground mb-8">
        ⭐ User Reviews
      </h2>

      {/* Average + Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-5 bg-muted/30 rounded-2xl border border-border">
        {/* Average */}
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-6xl font-black text-foreground">
            {avgRating.toFixed(1)}
          </p>
          <Stars rating={Math.round(avgRating)} />
          <p className="text-sm text-muted-foreground">
            {reviews.length} reviews
          </p>
        </div>
        {/* Breakdown */}
        <div className="space-y-2">
          {breakdown.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs font-medium w-4 text-right">{star}</span>
              <span className="text-yellow-400 text-sm">★</span>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{
                    width:
                      reviews.length > 0
                        ? `${(count / reviews.length) * 100}%`
                        : "0%",
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["recent", "helpful", "highest"] as SortType[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSort(s)}
            data-ocid="reviews.sort.tab"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              sort === s
                ? "bg-[#E63946] text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s === "recent"
              ? "Most Recent"
              : s === "helpful"
                ? "Most Helpful"
                : "Highest Rated"}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4 mb-10">
        <AnimatePresence mode="popLayout">
          {sorted.map((review, i) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              data-ocid={`reviews.item.${i + 1}` as any}
              className="p-5 bg-card rounded-2xl border border-border"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">
                      {review.name}
                    </span>
                    {review.verified && (
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Stars rating={review.rating} />
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground mb-3">{review.text}</p>

              {(review.pros || review.cons) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {review.pros && (
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-700 mb-1">
                        ✅ Pros
                      </p>
                      {review.pros.split(",").map((p, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                        <p key={idx} className="text-xs text-green-700">
                          • {p.trim()}
                        </p>
                      ))}
                    </div>
                  )}
                  {review.cons && (
                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3">
                      <p className="text-xs font-semibold text-red-700 mb-1">
                        ❌ Cons
                      </p>
                      {review.cons.split(",").map((c, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                        <p key={idx} className="text-xs text-red-700">
                          • {c.trim()}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Helpful?</span>
                <button
                  type="button"
                  onClick={() => handleThumb(review.id, "helpful")}
                  data-ocid={`reviews.helpful_button.${i + 1}` as any}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-600 transition-colors"
                >
                  👍 {review.helpful}
                </button>
                <button
                  type="button"
                  onClick={() => handleThumb(review.id, "unhelpful")}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-600 transition-colors"
                >
                  👎 {review.unhelpful}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Write Review Form */}
      <div
        data-ocid="reviews.form"
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-lg font-bold text-foreground mb-5">
          ✍️ Apna Review Likho
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">
                Aapka Naam *
              </Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rahul Kumar"
                required
                data-ocid="reviews.name_input"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">
                Rating *
              </Label>
              <div data-ocid="reviews.rating_select">
                <Stars
                  rating={form.rating}
                  interactive
                  onSelect={(r) => setForm({ ...form, rating: r })}
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-1.5 block">
              Review *
            </Label>
            <Textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Phone ke baare mein apna experience likhein..."
              required
              rows={3}
              data-ocid="reviews.textarea"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">
                Pros (optional)
              </Label>
              <Input
                value={form.pros}
                onChange={(e) => setForm({ ...form, pros: e.target.value })}
                placeholder="e.g. Good camera, Fast performance"
                data-ocid="reviews.pros_input"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">
                Cons (optional)
              </Label>
              <Input
                value={form.cons}
                onChange={(e) => setForm({ ...form, cons: e.target.value })}
                placeholder="e.g. No charger in box"
                data-ocid="reviews.cons_input"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="verified"
              checked={form.verified}
              onCheckedChange={(v) => setForm({ ...form, verified: !!v })}
              data-ocid="reviews.verified_checkbox"
            />
            <Label htmlFor="verified" className="text-sm cursor-pointer">
              Main ek Verified Buyer hoon
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white font-bold"
            data-ocid="reviews.submit_button"
          >
            Review Submit Karo 🚀
          </Button>
        </form>
      </div>
    </section>
  );
}
