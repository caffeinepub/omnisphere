import { Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, Target, Users, Zap } from "lucide-react";
import { SiWhatsapp, SiX } from "react-icons/si";

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "Founder & Senior Tech Writer — 5 Years Experience",
    avatar: "RS",
    bio: "5+ years in tech journalism. Specialises in smartphone reviews and budget phone recommendations. Tested 100+ devices personally. Former contributor to Tech2 and NDTV Gadgets360.",
    color: "bg-primary",
  },
  {
    name: "Priya Singh",
    role: "Laptops & Productivity Editor — 4 Years Experience",
    avatar: "PS",
    bio: "IIT graduate turned tech writer. Expert in laptop performance benchmarks, software ecosystems, and productivity tools. Runs a weekly productivity column loved by students and professionals alike.",
    color: "bg-blue-600",
  },
  {
    name: "Arjun Mehta",
    role: "Tips & Tricks Specialist — 3 Years Experience",
    avatar: "AM",
    bio: "Android power user and rooting expert. Finds hidden features and optimises devices for peak performance. His 'Hidden Android Features' series has 200K+ total reads.",
    color: "bg-green-600",
  },
  {
    name: "Vikash Kumar",
    role: "Gaming Editor — 4 Years Experience",
    avatar: "VK",
    bio: "Professional gamer turned tech writer. Specialises in gaming hardware, BGMI performance, and GPU benchmarks. Vikash has reviewed 40+ gaming phones and laptops.",
    color: "bg-orange-600",
  },
];

const VALUES = [
  {
    icon: <Globe size={24} />,
    title: "Hinglish First",
    desc: "Hum English aur Hindi ka perfect mix use karte hain taaki har Indian tech enthusiast content easily samajh sake.",
  },
  {
    icon: <Zap size={24} />,
    title: "Fast & Accurate",
    desc: "Latest tech news aur reviews fastest possible time mein — bina accuracy compromise kiye. Har fact double-checked hota hai.",
  },
  {
    icon: <Target size={24} />,
    title: "Honest Reviews",
    desc: "Hum kisi bhi brand ke liye biased nahi hain. Har review honest, hands-on testing pe based hota hai — koi paid placement nahi.",
  },
  {
    icon: <Users size={24} />,
    title: "Community First",
    desc: "Hamare readers hi hamari biggest asset hain. Community feedback se hi hum better bante hain — har suggestion genuinely considered hota hai.",
  },
];

const STATS = [
  { number: "24+", label: "Articles Published" },
  { number: "30+", label: "Devices Reviewed" },
  { number: "50,000+", label: "Monthly Readers" },
  { number: "Est. 2021", label: "India's Hinglish Tech Blog" },
];

const REACH_STATS = [
  { number: "30+", label: "Cities Reached" },
  { number: "6", label: "Content Categories" },
  { number: "Weekly", label: "New Articles" },
  { number: "4.8/5", label: "Reader Trust Score" },
];

export function AboutPage() {
  return (
    <main
      className="container mx-auto px-4 py-8 max-w-4xl"
      data-ocid="about.section"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Hero */}
      <div className="text-center py-12 mb-8 bg-gradient-to-br from-muted/50 to-primary/5 rounded-2xl border border-border">
        <div className="flex items-center justify-center gap-1 text-4xl font-bold mb-3">
          <span className="text-foreground">Omni</span>
          <span className="text-primary">Sphere</span>
          <span className="w-3 h-3 rounded-full bg-primary ml-1" />
        </div>
        <p className="text-xl text-muted-foreground font-medium mb-2">
          India's Trusted Hinglish Technology Publication
        </p>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
          2021 mein shuru hua ek passion project — aaj OmniSphere India ka
          most-read Hinglish tech blog ban gaya hai.
        </p>
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto px-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-background/80 border border-border rounded-xl py-4 px-2"
            >
              <div className="text-xl font-bold text-primary">
                {stat.number}
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why We Started */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Why We Started OmniSphere
        </h2>
        <div className="p-6 bg-card rounded-xl border border-border border-l-4 border-l-primary">
          <p className="text-base text-card-foreground leading-relaxed">
            In 2021, our founder Rahul Sharma noticed a gap — India has millions
            of tech-savvy consumers, but most quality tech content was either in
            formal English (inaccessible to many) or informal Hindi (lacking
            depth). OmniSphere was born to fill that gap: delivering genuinely
            helpful, deeply researched tech content in Hinglish — the language
            Indians actually speak.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mt-3">
            Today, OmniSphere covers 30+ phone models, 15+ laptops, and
            publishes 2–3 in-depth articles every week — each one fact-checked,
            independently written, and never influenced by advertising or brand
            relationships.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Hamara Mission
        </h2>
        <div className="p-6 bg-card rounded-xl border border-border">
          <p className="text-base text-card-foreground leading-relaxed">
            <strong>OmniSphere ka mission simple hai:</strong> India ke har tech
            enthusiast tak quality technology information pahunchana — chahe woh
            Hindi belt ka student ho, ya metro city ka professional. Hum
            genuinely helpful, deeply researched content likhte hain — buying
            decisions aasaan karne ke liye.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mt-3">
            Hum believe karte hain ki language ek barrier nahi honi chahiye.
            Isliye hum Hinglish mein likhte hain — ek aisi language jo genuinely
            India mein boli jaati hai.
          </p>
        </div>
      </section>

      {/* Editorial Promise */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Our Editorial Promise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-card rounded-xl border border-border">
            <div className="text-2xl mb-3">✅</div>
            <h3 className="font-bold text-card-foreground mb-2">
              Zero Paid Reviews
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No brand has ever paid us for a positive review. Our scores are
              earned, never bought.
            </p>
          </div>
          <div className="p-5 bg-card rounded-xl border border-border">
            <div className="text-2xl mb-3">✅</div>
            <h3 className="font-bold text-card-foreground mb-2">
              Affiliate Transparency
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All buy links are clearly marked as affiliate links. We earn a
              commission; you pay nothing extra.
            </p>
          </div>
          <div className="p-5 bg-card rounded-xl border border-border">
            <div className="text-2xl mb-3">✅</div>
            <h3 className="font-bold text-card-foreground mb-2">
              Original Research
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We personally test or extensively research every product we cover
              — no spec-sheet rewrites.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Hamare Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map((val) => (
            <div
              key={val.title}
              className="p-5 bg-card rounded-xl border border-border flex gap-4"
            >
              <div className="text-primary mt-0.5 shrink-0">{val.icon}</div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">
                  {val.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Hamari Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="p-5 bg-card rounded-xl border border-border flex gap-4"
            >
              <div
                className={`w-12 h-12 rounded-full ${member.color} text-white flex items-center justify-center font-bold text-sm shrink-0`}
              >
                {member.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  {member.name}
                </h3>
                <p className="text-xs text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Reach */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          As Covered By / Our Reach
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {REACH_STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 bg-card border border-border rounded-xl"
            >
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="p-6 bg-foreground text-background rounded-2xl text-center">
        <h2 className="text-xl font-bold mb-2">Contact Karo</h2>
        <p className="text-background/70 text-sm mb-5">
          Collaboration, PR inquiries, ya bas baat karni ho — reach out karo!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="mailto:hello@omnisphere.in"
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            📧 Email Us
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-background/10 text-background rounded-lg text-sm font-semibold hover:bg-background/20 transition-colors flex items-center gap-2"
          >
            <SiX size={14} /> Twitter
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <SiWhatsapp size={14} /> WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
