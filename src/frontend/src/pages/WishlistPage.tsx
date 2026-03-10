import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { PhoneCard } from "../components/PhoneCard";
import { PHONES_DATA } from "../data/phones";

export function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(
        localStorage.getItem("omni_wishlist") || "[]",
      );
      setWishlistIds(ids);
    } catch {
      setWishlistIds([]);
    }
  }, []);

  const phones = PHONES_DATA.filter((p) => wishlistIds.includes(p.id));

  const removeFromWishlist = (phoneId: string) => {
    const updated = wishlistIds.filter((id) => id !== phoneId);
    localStorage.setItem("omni_wishlist", JSON.stringify(updated));
    setWishlistIds(updated);
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={28} className="text-red-500 fill-red-500" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            My Saved Phones
          </h1>
          <p className="text-sm text-muted-foreground">
            {phones.length > 0
              ? `${phones.length} phone${phones.length > 1 ? "s" : ""} saved`
              : "Koi saved phone nahi hai"}
          </p>
        </div>
      </div>

      {phones.length === 0 ? (
        <div
          className="text-center py-20 flex flex-col items-center gap-4"
          data-ocid="wishlist.empty_state"
        >
          <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <Heart size={36} className="text-red-300" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              Koi saved phone nahi hai
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Phone cards pe ❤️ icon click karke save karo
            </p>
          </div>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 mt-2">
              Browse Phones
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((phone, i) => (
            <div
              key={phone.id}
              className="relative"
              data-ocid={`wishlist.item.${i + 1}`}
            >
              <PhoneCard phone={phone} index={i + 1} />
              <button
                type="button"
                onClick={() => removeFromWishlist(phone.id)}
                className="mt-2 w-full text-xs text-red-500 hover:text-red-600 font-medium py-1 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                data-ocid={`wishlist.delete_button.${i + 1}`}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
