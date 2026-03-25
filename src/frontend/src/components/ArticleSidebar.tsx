import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { CATEGORY_COLOR_MAP } from "../data/posts";
import { useGetAllCategories, useGetAllPosts } from "../hooks/useQueries";

export function ArticleSidebar() {
  const { data: posts = [] } = useGetAllPosts();
  const { data: categories = [] } = useGetAllCategories();

  const trendingPosts = posts.slice(0, 5);
  const recentPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="sticky top-20 max-h-screen overflow-y-auto flex flex-col gap-5 pb-4 scrollbar-thin">
      {/* AdSense Sidebar Placeholder (top) */}
      <div className="adsense-sidebar min-h-[250px] bg-muted/30 border border-dashed border-border rounded-xl flex items-center justify-center text-xs text-muted-foreground">
        Advertisement
      </div>

      {/* Trending Posts */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            🔥 Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-3">
          {trendingPosts.map((post) => (
            <Link
              key={post.slug}
              to="/article/$slug"
              params={{ slug: post.slug }}
              className="flex gap-3 items-start group"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <Badge
                  className={`text-[10px] px-1.5 py-0 mb-1 ${
                    CATEGORY_COLOR_MAP[post.category] ??
                    "bg-primary text-primary-foreground"
                  }`}
                >
                  {post.category}
                </Badge>
                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            📂 Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-1.5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            🕒 Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to="/article/$slug"
              params={{ slug: post.slug }}
              className="group"
            >
              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
