import { Link } from "@tanstack/react-router";
import { Home, Laptop, Newspaper, Smartphone } from "lucide-react";

export function NotFoundPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div
          className="text-8xl font-extrabold text-primary mb-4 leading-none"
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 text-base">
          Yeh page exist nahi karta! 😕 <br />
          Shayad URL galat hai ya page delete ho gaya hai.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            data-ocid="notfound.primary_button"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>

        <div className="border border-border rounded-2xl p-6 bg-card">
          <p className="text-sm font-semibold text-foreground mb-4">
            Yahan se navigate karo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/"
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors text-sm text-foreground"
              data-ocid="notfound.home.link"
            >
              <Home size={22} className="text-primary" />
              Home
            </Link>
            <a
              href="/#latest"
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors text-sm text-foreground"
              data-ocid="notfound.phones.link"
            >
              <Smartphone size={22} className="text-primary" />
              Browse Phones
            </a>
            <a
              href="/#laptops"
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors text-sm text-foreground"
              data-ocid="notfound.laptops.link"
            >
              <Laptop size={22} className="text-primary" />
              Browse Laptops
            </a>
          </div>
          <div className="mt-3">
            <Link
              to="/category/$slug"
              params={{ slug: "reviews" }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors text-sm text-foreground w-full"
              data-ocid="notfound.articles.link"
            >
              <Newspaper size={22} className="text-primary" />
              Articles
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
