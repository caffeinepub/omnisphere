import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";
import {
  useGetAllCategories,
  useGetPostsByCategory,
} from "../hooks/useQueries";

export function CategoryPage() {
  const { slug } = useParams({ from: "/category/$slug" });
  const { data: posts = [] } = useGetPostsByCategory(slug);
  const { data: categories = [] } = useGetAllCategories();

  const category = categories.find((c) => c.slug === slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Category Header */}
      <div
        className="flex items-center gap-4 mb-8 p-6 bg-card rounded-xl border border-border"
        data-ocid="category.section"
      >
        <span className="text-5xl">{category?.icon ?? "📂"}</span>
        <div>
          <h1 className="text-2xl font-bold text-card-foreground capitalize">
            {category?.name ?? slug}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {category?.description ?? `${slug} se related saari articles`}
          </p>
          <span className="text-xs text-muted-foreground mt-2 inline-block">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-16" data-ocid="category.empty_state">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-xl font-semibold mb-2">Koi article nahi mila</h2>
          <p className="text-muted-foreground text-sm">
            Is category mein abhi koi article nahi hai. Jald hi aayenge!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to="/article/$slug"
              params={{ slug: post.slug }}
            >
              <ArticleCard
                post={post}
                data-ocid={`category.item.${i + 1}` as any}
              />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
