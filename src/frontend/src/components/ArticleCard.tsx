import { Link } from "@tanstack/react-router";
import { Calendar, Clock, User } from "lucide-react";
import { CATEGORY_COLOR_MAP, type Post } from "../data/posts";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80";

interface ArticleCardProps {
  post: Post;
  variant?: "featured" | "default" | "horizontal";
  "data-ocid"?: string;
}

export function ArticleCard({
  post,
  variant = "default",
  "data-ocid": ocid,
}: ArticleCardProps) {
  const categoryClass =
    CATEGORY_COLOR_MAP[post.category] ?? "bg-primary text-primary-foreground";

  if (variant === "featured") {
    return (
      <div
        className="group bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border/60 flex flex-col"
        data-ocid={ocid}
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={post.imageUrl}
            alt={post.title}
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass}`}
          >
            {post.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-card-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
            <Link
              to="/article/$slug"
              params={{ slug: post.slug }}
              className="text-xs font-semibold text-primary hover:underline transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-card rounded-xl overflow-hidden border border-border/60 shadow-card card-hover flex flex-col"
      data-ocid={ocid}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          crossOrigin="anonymous"
          className="w-full aspect-video object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass}`}
        >
          {post.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-snug text-card-foreground group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <div className="mt-auto pt-3 flex items-center gap-3 text-xs text-muted-foreground border-t border-border">
          <span className="flex items-center gap-1">
            <User size={11} />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={11} />
            {post.readingTimeMinutes}m
          </span>
        </div>
      </div>
    </div>
  );
}
