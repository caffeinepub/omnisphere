import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

export function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks, we'll get back to you! 🙏");
    }, 800);
  }

  return (
    <main
      className="container mx-auto px-4 py-8 max-w-4xl"
      data-ocid="contact.section"
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
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
          <MessageCircle size={28} />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground text-sm">हमसे संपर्क करें</p>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          Koi bhi question, feedback, ya collaboration ke liye reach out karo —
          hum 24–48 ghante mein reply karte hain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Hamse Milo</h2>

          <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Email</p>
              <a
                href="mailto:hello@omnishpere.in"
                className="text-primary hover:underline text-sm"
              >
                hello@omnishpere.in
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                PR, collaborations, reviews
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border">
            <div className="p-2.5 rounded-lg bg-green-500/10 text-green-600 shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">WhatsApp</p>
              <a
                href="https://wa.me/919235727927"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm"
              >
                +91 92357 27927
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Quick queries ke liye
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Location</p>
              <p className="text-sm text-muted-foreground">India 🇮🇳</p>
              <p className="text-xs text-muted-foreground mt-1">
                Serving all of India, Hinglish mein
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-600 shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                Business Hours
              </p>
              <p className="text-sm text-muted-foreground">
                Mon – Sat: 10:00 AM – 7:00 PM IST
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sunday: Closed
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919235727927"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
            data-ocid="contact.whatsapp.button"
          >
            <SiWhatsapp size={18} />
            WhatsApp par Message Karo
          </a>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">
            Message Bhejo
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="contact.modal"
          >
            <div className="space-y-1.5">
              <Label htmlFor="contact-name" className="text-sm font-medium">
                Aapka Naam *
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.input"
                placeholder="Jaise: Rahul Sharma"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="contact-email"
                type="email"
                data-ocid="contact.input"
                placeholder="aapka@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message" className="text-sm font-medium">
                Message *
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.textarea"
                placeholder="Aapka message yahan likhein..."
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                required
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full"
              data-ocid="contact.submit_button"
            >
              {submitting ? "Bhej rahe hain..." : "📩 Message Bhejo"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
