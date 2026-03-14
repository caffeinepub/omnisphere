import { Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, Target, Users, Zap } from "lucide-react";
import { SiWhatsapp, SiX } from "react-icons/si";

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "Founder & Senior Tech Writer",
    avatar: "RS",
    bio: "5 saal se tech journalism mein hain. Smartphones aur gadgets ke diwane hain — khali time mein Genshin Impact khelate hain.",
    color: "bg-primary",
  },
  {
    name: "Priya Singh",
    role: "Laptops & Productivity Editor",
    avatar: "PS",
    bio: "IIT graduate jo ab tech writing mein career banaya hai. Laptops, software aur productivity tools inki specialty hai.",
    color: "bg-blue-600",
  },
  {
    name: "Arjun Mehta",
    role: "Tips & Tricks Specialist",
    avatar: "AM",
    bio: "Android ka walking encyclopedia. Hidden features aur shortcuts dhundna inhe bahut pasand hai. Rooting aur modding expert.",
    color: "bg-green-600",
  },
  {
    name: "Vikash Kumar",
    role: "Gaming Editor",
    avatar: "VK",
    bio: "Professional gamer turned tech writer. BGMI aur FPS games mein rank 1 aana inki daily habit hai. Gaming hardware reviews inki specialty.",
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
    desc: "Latest tech news aur reviews fastest possible time mein — bina accuracy compromise kiye.",
  },
  {
    icon: <Target size={24} />,
    title: "Honest Reviews",
    desc: "Hum kisi bhi brand ke liye biased nahi hain. Har review honest opinion pe based hota hai.",
  },
  {
    icon: <Users size={24} />,
    title: "Community First",
    desc: "Hamare readers hi hamari biggest asset hain. Community feedback se hi hum better bante hain.",
  },
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
      <div className="text-center py-12 mb-12 bg-gradient-to-br from-muted/50 to-primary/5 rounded-2xl border border-border">
        <div className="flex items-center justify-center gap-1 text-4xl font-bold mb-3">
          <span className="text-foreground">Omni</span>
          <span className="text-primary">Sphere</span>
          <span className="w-3 h-3 rounded-full bg-primary ml-1" />
        </div>
        <p className="text-xl text-muted-foreground font-medium mb-2">
          India ka Best Hinglish Tech Blog
        </p>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          2021 mein shuru hua ek chhota sa passion project — aaj OmniSphere
          India ka most-read Hinglish tech blog ban gaya hai.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Hamara Mission
        </h2>
        <div className="p-6 bg-card rounded-xl border border-border border-l-4 border-l-primary">
          <p className="text-base text-card-foreground leading-relaxed">
            <strong>OmniSphere ka mission simple hai:</strong> India ke har tech
            enthusiast tak quality technology information pahunchana — chahe woh
            Hindi belt ka student ho, ya metro city ka professional.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mt-3">
            Hum believe karte hain ki language ek barrier nahi honi chahiye.
            Isliye hum Hinglish mein likhte hain — ek aisi language jo genuinely
            India mein boli jaati hai.
          </p>
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

      {/* Contact */}
      <section className="p-6 bg-foreground text-background rounded-2xl text-center">
        <h2 className="text-xl font-bold mb-2">Contact Karo</h2>
        <p className="text-background/70 text-sm mb-5">
          Collaboration, PR inquiries, ya bas baat karni ho — reach out karo!
        </p>
        <div className="flex justify-center gap-4">
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
