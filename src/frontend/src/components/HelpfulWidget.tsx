import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface Props {
  articleSlug: string;
}

function getStorageKey(slug: string) {
  return `omni_helpful_${slug}`;
}

type VoteType = "up" | "down" | null;

export function HelpfulWidget({ articleSlug }: Props) {
  const key = getStorageKey(articleSlug);

  const [voted, setVoted] = useState<VoteType>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "up" || stored === "down") return stored;
    } catch {}
    return null;
  });

  const handleVote = (type: "up" | "down") => {
    if (voted) return;
    try {
      localStorage.setItem(key, type);
    } catch {}
    setVoted(type);
  };

  if (voted) {
    return (
      <div
        className="my-8 p-5 rounded-2xl border border-border bg-card text-center"
        data-ocid="article.success_state"
      >
        <p className="text-base font-semibold text-foreground">
          Shukriya! Aapka feedback mil gaya 🙏
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {voted === "up"
            ? "Khushi hui ki aapko yeh article helpful laga!"
            : "Hum ise improve karne ki koshish karenge."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="my-8 p-5 rounded-2xl border border-border bg-card text-center"
      data-ocid="article.panel"
    >
      <p className="text-sm font-semibold text-foreground mb-4">
        Kya yeh article helpful tha?
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => handleVote("up")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background hover:border-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all duration-200 text-sm font-medium text-foreground"
          data-ocid="article.primary_button"
        >
          <ThumbsUp size={16} /> Haan, helpful tha!
        </button>
        <button
          type="button"
          onClick={() => handleVote("down")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background hover:border-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 text-sm font-medium text-foreground"
          data-ocid="article.secondary_button"
        >
          <ThumbsDown size={16} /> Improve karo
        </button>
      </div>
    </div>
  );
}
