import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FileText, Shield, Users } from "lucide-react";

export function EditorialPolicyPage() {
  return (
    <main
      className="container mx-auto px-4 py-12 max-w-3xl"
      data-ocid="editorial_policy.section"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        data-ocid="editorial_policy.link"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">
        Editorial Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: 25 March 2026 &nbsp;|&nbsp; Effective for:{" "}
        <a
          href="https://omnishpere.in"
          className="text-primary hover:underline"
        >
          omnishpere.in
        </a>
      </p>

      {/* Callout box */}
      <div className="flex gap-4 p-5 bg-primary/5 border border-primary/20 rounded-xl mb-10">
        <Shield size={24} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground mb-1">
            Our Editorial Commitment
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            OmniSphere is an independent publication. Every review, comparison,
            and buying guide is written without advertiser influence. Our only
            obligation is to our readers. If you believe we have fallen short of
            this standard, please contact us at{" "}
            <a
              href="mailto:editorial@omnishpere.in"
              className="text-primary hover:underline"
            >
              editorial@omnishpere.in
            </a>
            .
          </p>
        </div>
      </div>

      {/* 1. Editorial Mission */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
          <FileText size={20} className="text-primary" />
          1. Our Editorial Mission
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere exists to give Indian tech consumers the honest, in-depth
          information they need to make smart purchase decisions. We are{" "}
          <strong>reader-first</strong> — every editorial choice is evaluated
          against one question: "Does this genuinely help our readers?"
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          We cover smartphones, laptops, gadgets, and emerging technology in
          Hinglish — the language most Indians actually speak — so that quality
          tech journalism is accessible to everyone, from a student in Patna to
          a professional in Pune.
        </p>
      </section>

      {/* 2. Editorial Independence */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          2. Editorial Independence
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere maintains complete separation between its editorial team
          and its commercial relationships. Brands and advertisers have{" "}
          <strong>no editorial influence</strong> over our content. We do not
          accept payment for positive reviews.
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>
            No brand has ever paid us for a favourable review or editorial
            placement.
          </li>
          <li>
            Sponsored or partnered content, if ever published, will be clearly
            labelled "Sponsored" or "Partner Content" at the top of the article.
          </li>
          <li>
            Review units provided by manufacturers are returned or disclosed.
            Free hardware does not guarantee a positive review.
          </li>
          <li>
            Affiliate links (Amazon, Flipkart) are present in some articles.
            They earn us a commission on purchases. They do not affect which
            products we recommend or how we score them.
          </li>
        </ul>
      </section>

      {/* 3. Review Process */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-primary" />
          3. Our Review Process
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Every product review on OmniSphere follows a consistent evaluation
          framework:
        </p>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground text-sm mb-1">
              📦 Hands-On Testing
            </h3>
            <p className="text-sm text-muted-foreground">
              We use devices for a minimum of 5–7 days before writing a full
              review. This includes real-world usage: calling, browsing, gaming,
              photography, and battery endurance.
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground text-sm mb-1">
              📊 Benchmark Criteria
            </h3>
            <p className="text-sm text-muted-foreground">
              Phones and laptops are scored on: Display quality, Performance,
              Camera system, Battery life & charging speed, Software experience,
              Build quality, and Value for money. Each category receives a
              weighted score contributing to the overall Expert Score out of 10.
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground text-sm mb-1">
              🎯 Scoring Rubric
            </h3>
            <p className="text-sm text-muted-foreground">
              9–10: Exceptional — flagship-tier performance in its class. 7–8:
              Excellent — strong recommendation with minor trade-offs. 5–6:
              Average — decent but with notable weaknesses. Below 5: Not
              recommended at its price point.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fact-Checking */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          4. Fact-Checking Standards
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          All specifications, prices, and technical claims in our articles are
          verified against multiple sources:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>Official manufacturer press releases and spec sheets.</li>
          <li>GSMArena, 91Mobiles, and Nanoreview for cross-verification.</li>
          <li>
            Independent benchmark tools (AnTuTu, Geekbench) where possible.
          </li>
          <li>
            Amazon.in and Flipkart for current pricing at time of publication.
          </li>
          <li>
            User reports and community feedback for real-world performance
            claims.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Prices are correct at time of writing. We include a price disclaimer
          in articles because e-commerce prices change frequently.
        </p>
      </section>

      {/* 5. Affiliate & Sponsored */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          5. Affiliate &amp; Sponsored Content Disclosure
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          OmniSphere participates in the{" "}
          <strong>Amazon Associates Programme</strong> and may include affiliate
          links to Flipkart and other retailers. When you click a "Buy on
          Amazon" or "Check Price" button and make a purchase, we earn a small
          commission — at no extra cost to you.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          This commission helps us keep OmniSphere free, independent, and
          without a paywall. However, it never influences which products we
          recommend or how we rate them. Products are selected for editorial
          merit alone.
        </p>
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Disclosure standard:</strong> Articles containing affiliate
            links display an affiliate disclosure banner at the top of the
            article, clearly stating the nature of the relationship.
          </p>
        </div>
      </section>

      {/* 6. Correction Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          6. Correction Policy
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We take accuracy seriously. If we publish incorrect information, we
          will correct it promptly and transparently:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>
            Minor corrections (typos, formatting) are made silently without a
            correction notice.
          </li>
          <li>
            Factual corrections (wrong specs, prices, claims) are noted at the
            bottom of the article with the correction date.
          </li>
          <li>
            Significant editorial corrections are noted prominently in the
            article body.
          </li>
          <li>
            We do not delete articles to hide errors — we correct them in place.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          To report a factual error, email us at{" "}
          <a
            href="mailto:editorial@omnishpere.in"
            className="text-primary hover:underline"
          >
            editorial@omnishpere.in
          </a>{" "}
          with the article URL and the specific error. We aim to respond within
          48 hours.
        </p>
      </section>

      {/* 7. Author Standards */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
          <Users size={20} className="text-primary" />
          7. Author Standards
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          All OmniSphere writers are required to:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>Have genuine experience in the technology niche they cover.</li>
          <li>
            Disclose any conflicts of interest relevant to articles they write.
          </li>
          <li>Follow our style guide for balanced, evidence-based writing.</li>
          <li>Maintain an author biography displayed on their articles.</li>
          <li>
            Not accept payments, gifts, or benefits from brands they cover
            without disclosure.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Author bios are visible on every article, detailing the writer's
          background, expertise, and years of experience. This allows readers to
          evaluate the credibility of each piece.
        </p>
      </section>

      {/* 8. Content Update Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          8. Content Update Policy
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Technology moves fast. Prices change, software updates alter
          performance, and new competitors launch regularly. OmniSphere is
          committed to keeping our content current:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground text-sm">
          <li>
            Buying guides and "best of" lists are reviewed every 3 months.
          </li>
          <li>
            Phone and laptop review pages are updated when major software
            changes occur.
          </li>
          <li>
            Price data is refreshed regularly from Amazon.in and Flipkart.
          </li>
          <li>
            All updated articles display a "Last Updated" date prominently.
          </li>
        </ul>
      </section>

      {/* 9. Contact */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          9. Contact for Editorial Issues
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          For corrections, editorial complaints, tip-offs, or questions about
          our editorial standards:
        </p>
        <div className="mt-4 p-5 rounded-xl border border-border bg-muted/30">
          <p className="font-semibold text-foreground">
            OmniSphere Editorial Team
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Editorial Email:{" "}
            <a
              href="mailto:editorial@omnishpere.in"
              className="text-primary hover:underline"
            >
              editorial@omnishpere.in
            </a>
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            General Enquiries:{" "}
            <a
              href="mailto:hello@omnishpere.in"
              className="text-primary hover:underline"
            >
              hello@omnishpere.in
            </a>
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Website:{" "}
            <a
              href="https://omnishpere.in"
              className="text-primary hover:underline"
            >
              omnishpere.in
            </a>
          </p>
        </div>
      </section>

      <p className="text-xs text-muted-foreground border-t border-border pt-6">
        This editorial policy applies to all content published on OmniSphere
        from the effective date above. We reserve the right to update this
        policy; changes will be posted here with an updated date.
      </p>
    </main>
  );
}
