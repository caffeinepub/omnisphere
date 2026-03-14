import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  IndianRupee,
  Info,
  Megaphone,
  ShieldAlert,
} from "lucide-react";

const SECTIONS = [
  {
    icon: <IndianRupee size={20} />,
    title: "Affiliate Links Disclosure",
    titleHi: "एफिलिएट लिंक्स",
    color: "text-orange-600 bg-orange-500/10",
    content: [
      "OmniSphere Amazon Associates Program ka participant hai aur Flipkart Affiliate Program mein bhi registered hai.",
      "Jab aap hamare 'Buy on Amazon' ya 'Buy on Flipkart' buttons par click karke koi product purchase karte hain, toh hum ek chhoti si commission earn karte hain — aapko koi extra cost nahi padta.",
      "Yeh affiliate commissions hi OmniSphere ko free aur independent rakhne mein help karti hain. Hum sirf woh products recommend karte hain jo genuinely helpful hain.",
    ],
  },
  {
    icon: <AlertTriangle size={20} />,
    title: "Prices May Vary",
    titleHi: "कीमतें बदल सकती हैं",
    color: "text-yellow-600 bg-yellow-500/10",
    content: [
      "Is website par diye gaye saare prices indicative hain aur publication time ke hisaab se accurate the.",
      "Smartphone aur laptop prices frequently change hoti hain — sale events, stock availability, aur retailer policies ke wajah se.",
      "Koi bhi purchase karne se pehle Amazon, Flipkart, ya retailer ki official website par latest price verify zaroor karein.",
      "OmniSphere price discrepancies ke liye responsible nahi hai.",
    ],
  },
  {
    icon: <Info size={20} />,
    title: "Information Accuracy",
    titleHi: "जानकारी की सटीकता",
    color: "text-blue-600 bg-blue-500/10",
    content: [
      "Hum apni best efforts se accurate aur up-to-date information provide karte hain, lekin OmniSphere par di gayi kisi bhi information ki completeness, accuracy, ya timeliness ki guarantee nahi di ja sakti.",
      "Tech industry tezi se badlati hai — specifications, availability, aur features manufacturer updates ke baad change ho sakte hain.",
      "Kisi bhi critical purchase decision ke liye official brand website ya authorized retailer se confirm karein.",
    ],
  },
  {
    icon: <Megaphone size={20} />,
    title: "Editorial Opinions",
    titleHi: "संपादकीय राय",
    color: "text-purple-600 bg-purple-500/10",
    content: [
      "OmniSphere par publish hone wali saari reviews, comparisons, aur buying guides hamari editorial team ki personal opinions hain.",
      "Yeh opinions independent hain — kisi bhi brand ya manufacturer se humara koi paid editorial agreement nahi hai.",
      "Sponsored content clearly 'Sponsored' ya 'Advertisement' label ke saath mark kiya jata hai. Organic reviews aur sponsored content mein hum clearly differentiate karte hain.",
    ],
  },
  {
    icon: <ShieldAlert size={20} />,
    title: "Google AdSense Ads",
    titleHi: "विज्ञापन",
    color: "text-red-600 bg-red-500/10",
    content: [
      "OmniSphere Google AdSense ke zariye ads display karta hai. Yeh ads Google ke algorithm dwara automatically serve hoti hain.",
      "Hum specific ads ke content ko control nahi karte. Agar koi ad offensive ya inappropriate lage, please hume immediately report karein.",
      "Ads se hone wali earnings website ke maintenance aur content creation mein use hoti hain.",
    ],
  },
  {
    icon: <ExternalLink size={20} />,
    title: "External Links",
    titleHi: "बाहरी लिंक्स",
    color: "text-teal-600 bg-teal-500/10",
    content: [
      "OmniSphere mein third-party websites ke links ho sakte hain — manufacturer sites, retailers, aur other tech publications.",
      "Yeh external sites hamare control mein nahi hain. Un sites ki privacy policies aur content ke liye hum responsible nahi hain.",
      "External links convenience ke liye provide ki gayi hain — endorsement nahi samjha jaaye.",
    ],
  },
];

export function DisclaimerPage() {
  return (
    <main
      className="container mx-auto px-4 py-8 max-w-3xl"
      data-ocid="disclaimer.section"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-1">Disclaimer</h1>
      <p className="text-sm text-muted-foreground mb-2">अस्वीकरण</p>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: March 2026 &nbsp;|&nbsp; Effective for:{" "}
        <a
          href="https://omnishpere.in"
          className="text-primary hover:underline"
        >
          omnishpere.in
        </a>
      </p>

      <div className="p-5 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl mb-10">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
          <strong>Please Note:</strong> OmniSphere ek independent Hinglish tech
          blog hai. Is website par di gayi koi bhi information informational
          purposes ke liye hai aur professional financial ya purchasing advice
          nahi hai. Important decisions mein qualified professionals se consult
          karein.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((sec, i) => (
          <section key={sec.title}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${sec.color} shrink-0`}>
                {sec.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {i + 1}. {sec.title}
                </h2>
                <p className="text-xs text-muted-foreground">{sec.titleHi}</p>
              </div>
            </div>
            <div className="space-y-3 pl-12">
              {sec.content.map((para) => (
                <p
                  key={para}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-foreground text-background rounded-2xl text-center">
        <p className="text-sm text-background/70 mb-3">
          Koi bhi concern hai disclaimer ke regarding?
        </p>
        <a
          href="mailto:hello@omnishpere.in"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          📧 Contact Us
        </a>
      </div>

      <p className="text-xs text-muted-foreground border-t border-border pt-6 mt-8">
        OmniSphere reserves the right to update this disclaimer at any time
        without prior notice. Continued use of the website after any changes
        constitutes acceptance of the updated disclaimer.
      </p>
    </main>
  );
}
