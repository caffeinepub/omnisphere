import { useEffect, useRef, useState } from "react";

const DEAL = {
  name: "Redmi Note 13 Pro+",
  image:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  originalPrice: 27999,
  dealPrice: 19999,
  specs: "8GB RAM • 200MP Camera • 5000mAh • 120W Charging",
  amazonUrl: "https://amazon.in",
  flipkartUrl: "https://flipkart.com",
};

function getOrSetResetTime(): number {
  const stored = localStorage.getItem("deal_reset_time");
  const now = Date.now();
  if (stored) {
    const t = Number.parseInt(stored, 10);
    if (now < t) return t;
  }
  const next = now + 24 * 60 * 60 * 1000;
  localStorage.setItem("deal_reset_time", String(next));
  return next;
}

function formatTime(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState("");
  const [viewers, setViewers] = useState(0);
  const resetTimeRef = useRef(0);

  useEffect(() => {
    resetTimeRef.current = getOrSetResetTime();
    setViewers(Math.floor(Math.random() * (1200 - 847 + 1)) + 847);

    const tick = setInterval(() => {
      const remaining = resetTimeRef.current - Date.now();
      if (remaining <= 0) {
        resetTimeRef.current = getOrSetResetTime();
      }
      setTimeLeft(formatTime(remaining));
    }, 1000);

    const viewerTick = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10;
        return Math.min(1200, Math.max(847, prev + delta));
      });
    }, 30000);

    setTimeLeft(formatTime(resetTimeRef.current - Date.now()));

    return () => {
      clearInterval(tick);
      clearInterval(viewerTick);
    };
  }, []);

  const discount = Math.round(
    ((DEAL.originalPrice - DEAL.dealPrice) / DEAL.originalPrice) * 100,
  );

  return (
    <section
      data-ocid="deal.section"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #B71C1C 0%, #E63946 50%, #C62828 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 py-10 relative">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">🔥</span>
            <div>
              <h2 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                Deal of the Day
              </h2>
              <p className="text-white/70 text-sm">
                Aaj ka sabse best offer — limited time!
              </p>
            </div>
          </div>
          {/* Countdown */}
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-2xl px-5 py-3">
            <span className="text-white/70 text-sm font-medium">Ends in:</span>
            <span
              data-ocid="deal.timer"
              className="text-white font-black text-2xl tabular-nums tracking-widest"
            >
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Deal Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10 bg-yellow-400 text-black font-black text-lg px-4 py-1 rounded-full shadow-lg rotate-3">
                -{discount}% OFF
              </div>
              <div className="bg-white/20 rounded-2xl overflow-hidden aspect-square max-w-xs mx-auto">
                <img
                  src={DEAL.image}
                  alt={DEAL.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80";
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-white font-black text-2xl md:text-3xl mb-2">
                {DEAL.name}
              </h3>
              <p className="text-white/70 text-sm mb-4">{DEAL.specs}</p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-white font-black text-4xl md:text-5xl">
                  ₹{DEAL.dealPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-white/50 line-through text-lg">
                  ₹{DEAL.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-full">
                  Save ₹
                  {(DEAL.originalPrice - DEAL.dealPrice).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              {/* Viewers */}
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-sm">
                  <strong className="text-white">
                    {viewers.toLocaleString("en-IN")}
                  </strong>{" "}
                  log abhi ye deal dekh rahe hain
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={DEAL.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="deal.amazon_button"
                  className="flex items-center gap-2 bg-[#FF9900] text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm shadow-lg"
                >
                  🛒 Amazon par Kharido
                </a>
                <a
                  href={DEAL.flipkartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="deal.flipkart_button"
                  className="flex items-center gap-2 bg-[#2874F0] text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-lg"
                >
                  🛍️ Flipkart par Kharido
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
