import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function TermsPage() {
  return (
    <main
      className="container mx-auto px-4 py-8 max-w-3xl"
      data-ocid="terms.section"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-1">
        Terms &amp; Conditions
      </h1>
      <p className="text-sm text-muted-foreground mb-2">नियम और शर्तें</p>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: March 2026 &nbsp;|&nbsp; Effective for:{" "}
        <a
          href="https://omnishpere.in"
          className="text-primary hover:underline"
        >
          omnishpere.in
        </a>
      </p>

      <p className="text-muted-foreground leading-relaxed mb-10">
        OmniSphere website use karne se pehle please yeh Terms &amp; Conditions
        dhyan se padhein. Is website ka use karne par aap in terms se agree
        karte hain.
      </p>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          1. Use of Website
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere (
          <a
            href="https://omnishpere.in"
            className="text-primary hover:underline"
          >
            omnishpere.in
          </a>
          ) ek Hinglish tech blog hai jo informational aur educational content
          provide karta hai. Is website ko access karke aap agree karte hain ki:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>Aap website ka use sirf lawful purposes ke liye karenge.</li>
          <li>
            Aap kisi bhi automated bot, scraper, ya crawl tools se website ka
            unauthorized use nahi karenge.
          </li>
          <li>
            Aap website ke kisi bhi part ko reproduce, distribute, ya sell nahi
            karenge bina written permission ke.
          </li>
          <li>
            Aap doosron ke rights ya privacy ko violate karne wala koi bhi act
            nahi karenge.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          2. Intellectual Property
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere par publish hone wala saara content — articles, reviews,
          images, logos, graphics, aur design — OmniSphere ka intellectual
          property hai aur copyright laws se protected hai.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Personal, non-commercial use ke liye content share karna allowed hai,
          provided credit OmniSphere ko diya jaye with a link back. Commercial
          use, republishing, ya bulk copying strictly prohibited hai.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Third-party trademarks (Samsung, Apple, OnePlus, etc.) unke respective
          owners ke property hain. Unka mention sirf editorial purposes ke liye
          hai.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          3. User Conduct
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Website use karte waqt yeh prohibited hai:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>
            Defamatory, abusive, hateful, ya sexually explicit content post
            karna.
          </li>
          <li>False identity se website ka misuse karna.</li>
          <li>
            Virus, malware, ya koi bhi harmful code upload karna ya spread
            karna.
          </li>
          <li>
            Website ki security ko bypass ya compromise karne ki koshish karna.
          </li>
          <li>
            Spam ya unsolicited promotional messages bhejne ke liye site ka
            misuse karna.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Violation par OmniSphere aapka access without notice terminate kar
          sakta hai aur legal action bhi le sakta hai.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          4. Affiliate Links &amp; Monetization
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere mein Amazon aur Flipkart ke affiliate links hain. Jab aap
          in links se purchase karte hain toh hum ek commission earn karte hain
          — aapko koi additional cost nahi hoti.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Hum Google AdSense ads bhi display karte hain. Yeh ads automatically
          Google dwara serve hote hain. OmniSphere specific ad content ke liye
          responsible nahi hai.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Hamari editorial opinions affiliate relationships se independent hain.
          Hum sirf woh products recommend karte hain jo genuinely readers ke
          liye valuable hain.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          5. Limitation of Liability
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere ki website use karne ke kisi bhi direct, indirect,
          incidental, ya consequential damages ke liye liability nahi hogi,
          including:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>
            Website content ki accuracy ya completeness pe reliance karne se
            hone wale losses.
          </li>
          <li>Affiliate links se ki gayi purchases mein issues.</li>
          <li>Third-party websites se related koi bhi problem.</li>
          <li>
            Technical issues jaise downtime, data loss, ya security breaches.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Is website par di gayi koi bhi information professional advice
          (financial, legal, medical) ka substitute nahi hai.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          6. Changes to Terms
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere kabhi bhi in Terms &amp; Conditions ko without prior notice
          update karne ka right rakhta hai. Changes is page par post ho jayenge
          updated date ke saath.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Update ke baad website continue use karna revised terms ki acceptance
          mani jayegi. Regularly yeh page check karne ki recommendation ki jaati
          hai.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          7. Governing Law
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Yeh Terms &amp; Conditions Indian law ke under governed hain. Koi bhi
          dispute India ke competent courts mein settle kiya jayega.
        </p>
      </section>

      {/* Section 8 — Contact */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          8. Contact Information
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Agar aapke koi questions hain in Terms ke baare mein, please contact
          karein:
        </p>
        <div className="mt-4 p-5 rounded-xl border border-border bg-muted/30">
          <p className="font-semibold text-foreground">OmniSphere</p>
          <p className="text-muted-foreground text-sm mt-1">
            Website:{" "}
            <a
              href="https://omnishpere.in"
              className="text-primary hover:underline"
            >
              omnishpere.in
            </a>
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Email:{" "}
            <a
              href="mailto:hello@omnishpere.in"
              className="text-primary hover:underline"
            >
              hello@omnishpere.in
            </a>
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            WhatsApp:{" "}
            <a
              href="https://wa.me/919235727927"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              +91 92357 27927
            </a>
          </p>
        </div>
      </section>

      <p className="text-xs text-muted-foreground border-t border-border pt-6">
        By continuing to use OmniSphere, you acknowledge that you have read,
        understood, and agreed to these Terms &amp; Conditions.
      </p>
    </main>
  );
}
