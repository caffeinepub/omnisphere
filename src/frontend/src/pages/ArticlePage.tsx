import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  RefreshCw,
  Share2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiFacebook, SiWhatsapp, SiX } from "react-icons/si";
import { ArticleCard } from "../components/ArticleCard";
import { BackToTop } from "../components/BackToTop";
import { HelpfulWidget } from "../components/HelpfulWidget";
import { ReviewSystem } from "../components/ReviewSystem";
import { TableOfContents } from "../components/TableOfContents";
import { CATEGORY_COLOR_MAP } from "../data/posts";
import { useGetAllPosts, useGetPostBySlug } from "../hooks/useQueries";

export function ArticlePage() {
  const { slug } = useParams({ from: "/article/$slug" });
  const { data: post } = useGetPostBySlug(slug);
  const { data: allPosts = [] } = useGetAllPosts();
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sameCategoryPosts = allPosts.filter(
    (p) => p.slug !== slug && p.category === post?.category,
  );
  const otherPosts = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post?.category,
  );
  const relatedPosts = sameCategoryPosts
    .slice(0, 3)
    .concat(otherPosts.slice(0, Math.max(0, 3 - sameCategoryPosts.length)));

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post?.title ?? "");

  const categoryClass = post
    ? (CATEGORY_COLOR_MAP[post.category] ??
      "bg-primary text-primary-foreground")
    : "";

  // Calculate "last updated" date (1 day after publish)
  const lastUpdated = post
    ? new Date(new Date(post.publishedAt).getTime() + 86400000 * 1)
    : null;

  if (!post) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="article.error_state"
      >
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-2">Article nahi mila</h1>
        <p className="text-muted-foreground mb-6">
          Ye article exist nahi karta ya delete ho gaya hai.
        </p>
        <Link to="/">
          <Button variant="outline">← Wapas Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${readProgress}%` }}
        data-ocid="article.loading_state"
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <Badge className={`mb-4 ${categoryClass}`}>{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-3 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {lastUpdated && (
              <span className="flex items-center gap-1.5 text-primary/80">
                <RefreshCw size={13} />
                Updated:{" "}
                {lastUpdated.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTimeMinutes} min read
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            💡 Prices mentioned may vary. Check Amazon/Flipkart for latest
            prices.
          </p>
        </div>

        {/* Social Share Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-muted/50 rounded-xl">
          <Share2 size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground mr-2">
            Share:
          </span>
          <a
            href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            data-ocid="article.share_button"
          >
            <SiWhatsapp size={14} /> WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-foreground text-background hover:opacity-80 transition-colors"
            data-ocid="article.share_button"
          >
            <SiX size={14} /> Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            data-ocid="article.share_button"
          >
            <SiFacebook size={14} /> Facebook
          </a>
        </div>

        {/* Two-column layout on desktop: article + TOC sidebar */}
        <div className="md:grid md:grid-cols-[1fr_280px] md:gap-10 md:items-start">
          <div>
            {/* Mobile TOC (above article) */}
            <TableOfContents content={post.content} />

            {/* Article Content */}
            <article
              className="article-content"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: article content is pre-sanitized
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Helpful Widget */}
            <HelpfulWidget articleSlug={slug} />

            {/* Review System */}
            <ReviewSystem articleSlug={slug} />
          </div>

          {/* Desktop TOC sidebar */}
          <div className="hidden md:block">
            <TableOfContents content={post.content} />
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6 text-foreground">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((p, i) => (
                <Link
                  key={p.slug}
                  to="/article/$slug"
                  params={{ slug: p.slug }}
                >
                  <ArticleCard
                    post={p}
                    data-ocid={`article.item.${i + 1}` as any}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Floating WhatsApp share button on mobile */}
      {readProgress > 5 && (
        <a
          href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-xl text-sm font-semibold"
          data-ocid="article.share_button"
        >
          <SiWhatsapp size={16} /> Share
        </a>
      )}

      <BackToTop />
    </>
  );
}
