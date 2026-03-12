export function HireUsPage() {
  const services = [
    {
      icon: "🌐",
      title: "Website Development",
      desc: "Professional websites jo aapke business ko online leke jaayein.",
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      desc: "Android & iOS apps tailored to your needs.",
    },
    {
      icon: "📢",
      title: "Social Media Ads",
      desc: "Facebook, Instagram & Google pe targeted ad campaigns.",
    },
    {
      icon: "🎯",
      title: "Digital Marketing",
      desc: "End-to-end digital strategy for brand growth.",
    },
    {
      icon: "✍️",
      title: "SEO Content Writing",
      desc: "SEO-optimized Hinglish content jo rank kare.",
    },
    {
      icon: "🛒",
      title: "E-commerce Setup",
      desc: "Online store setup — ready to sell from day one.",
    },
  ];

  return (
    <main className="min-h-screen" data-ocid="hire_us.page">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500 blur-3xl" />
        </div>
        <div className="relative container mx-auto max-w-3xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
            Hire Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Kya Aapko <span className="text-primary">Digital Help</span>{" "}
            Chahiye?
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Aapka Digital Sapna,{" "}
            <span className="text-primary font-semibold">
              Hamari Zimmedari!
            </span>
          </p>
          <a
            href="https://wa.me/919235727927"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-7 py-3.5 rounded-2xl text-base shadow-lg shadow-green-900/30 transition-all duration-200 hover:scale-105"
            data-ocid="hire_us.whatsapp.button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-label="WhatsApp"
            >
              <title>WhatsApp</title>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.107 1.522 5.836L.057 23.998l6.304-1.453A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.372l-.359-.213-3.741.862.937-3.625-.234-.372A9.818 9.818 0 1112 21.818z" />
            </svg>
            Chat on WhatsApp — Free Consultation!
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-16 px-4 bg-background"
        data-ocid="hire_us.services.section"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Hamare Services
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Har digital zarorat ke liye — ek hi jagah solution.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                data-ocid={`hire_us.service.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section
        className="py-16 px-4 bg-muted/40"
        data-ocid="hire_us.contact.section"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Free Consultation Ke Liye{" "}
            <span className="text-primary">Abhi Contact Karo!</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Koi bhi sawaal ho ya project discuss karna ho — hum yahan hain.
            Pehli consultation bilkul FREE hai.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919235727927"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-7 py-3.5 rounded-2xl text-base shadow-lg shadow-green-900/20 transition-all duration-200 hover:scale-105 w-full sm:w-auto justify-center"
              data-ocid="hire_us.whatsapp_cta.button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-label="WhatsApp"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.107 1.522 5.836L.057 23.998l6.304-1.453A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.372l-.359-.213-3.741.862.937-3.625-.234-.372A9.818 9.818 0 1112 21.818z" />
              </svg>
              Chat on WhatsApp — Free Consultation!
            </a>
            <a
              href="mailto:hello@omnishpere.in"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm font-medium"
              data-ocid="hire_us.email.link"
            >
              📧 hello@omnishpere.in
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
