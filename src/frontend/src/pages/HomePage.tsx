import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ArticleCard } from "../components/ArticleCard";
import { useGetAllCategories, useGetAllPosts } from "../hooks/useQueries";

export function HomePage() {
  const { data: posts = [] } = useGetAllPosts();
  const { data: categories = [] } = useGetAllCategories();
  const [email, setEmail] = useState("");
  const latestRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const featuredPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(0, 6);

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

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30 border-b border-border">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, oklch(0.18 0.04 268) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Red accent blob */}
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
    </main>
  );
}
