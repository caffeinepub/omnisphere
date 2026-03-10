import { Link } from "@tanstack/react-router";
import { SiFacebook, SiWhatsapp, SiX } from "react-icons/si";

const CATEGORY_LINKS = [
  { label: "Reviews", slug: "reviews" },
  { label: "Tips & Tricks", slug: "tips" },
  { label: "Comparisons", slug: "comparisons" },
  { label: "Gaming", slug: "gaming" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-2xl font-bold text-background">Omni</span>
              <span className="text-2xl font-bold text-primary">Sphere</span>
              <span className="w-2 h-2 rounded-full bg-primary ml-0.5" />
            </div>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              India ka Best Hinglish Tech Blog. Smartphones, laptops, reviews
              aur bahut kuch — simple Hinglish mein.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 text-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <SiX size={16} />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 text-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 text-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-background/40 uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-background/70 hover:text-primary transition-colors"
              >
                Home
              </Link>
              {CATEGORY_LINKS.map((link) => (
                <Link
                  key={link.slug}
                  to="/category/$slug"
                  params={{ slug: link.slug }}
                  className="text-sm text-background/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/about"
                className="text-sm text-background/70 hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-background/40 uppercase tracking-widest mb-4">
              About Us
            </h3>
            <p className="text-sm text-background/60 leading-relaxed">
              OmniSphere ek passionate tech writers ki team hai jo India ke tech
              enthusiasts ke liye best content create karte hain — Hinglish
              mein, jo sabko samajh aaye.
            </p>
            <p className="text-xs text-background/40 mt-3">
              📧 hello@omnisphere.in
            </p>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            © {year} OmniSphere. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
