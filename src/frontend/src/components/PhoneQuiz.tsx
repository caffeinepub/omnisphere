import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { PHONES_DATA } from "../data/phones";
import { FALLBACK_IMAGE } from "../data/phones";
import { T } from "../i18n/translations";

const STEPS = [
  {
    id: "budget",
    question: "Aapka budget kya hai?",
    options: [
      { label: "Under \u20b910k", value: "under10k" },
      { label: "\u20b910k\u201320k", value: "10k-20k" },
      { label: "\u20b920k\u201330k", value: "20k-30k" },
      { label: "\u20b930k+", value: "30k+" },
    ],
  },
  {
    id: "priority",
    question: "Aapki priority kya hai?",
    options: [
      { label: "Camera", value: "camera" },
      { label: "Battery", value: "battery" },
      { label: "Performance", value: "performance" },
      { label: "All Rounder", value: "allrounder" },
    ],
  },
  {
    id: "usage",
    question: "Phone kaisa use karenge?",
    options: [
      { label: "Gaming", value: "gaming" },
      { label: "Social Media", value: "social" },
      { label: "Business", value: "business" },
      { label: "Basic Use", value: "basic" },
    ],
  },
  {
    id: "5g",
    question: "5G chahiye?",
    options: [
      { label: "Yes, chahiye", value: "yes" },
      { label: "Nahi chahiye", value: "no" },
      { label: "Don't care", value: "any" },
    ],
  },
  {
    id: "brand",
    question: "Brand preference?",
    options: [
      { label: "Redmi", value: "redmi" },
      { label: "Realme", value: "realme" },
      { label: "Samsung", value: "samsung" },
      { label: "OnePlus", value: "oneplus" },
      { label: "Any Brand", value: "any" },
    ],
  },
];

function getRecommendations(answers: Record<string, string>) {
  let filtered = [...PHONES_DATA];

  const budget = answers.budget;
  if (budget === "under10k")
    filtered = filtered.filter((p) => p.priceValue <= 10000);
  else if (budget === "10k-20k")
    filtered = filtered.filter(
      (p) => p.priceValue > 10000 && p.priceValue <= 20000,
    );
  else if (budget === "20k-30k")
    filtered = filtered.filter(
      (p) => p.priceValue > 20000 && p.priceValue <= 30000,
    );
  else if (budget === "30k+")
    filtered = filtered.filter((p) => p.priceValue > 30000);

  const brand = answers.brand;
  if (brand && brand !== "any") {
    const brandFiltered = filtered.filter((p) =>
      p.name.toLowerCase().includes(brand.toLowerCase()),
    );
    if (brandFiltered.length > 0) filtered = brandFiltered;
  }

  filtered.sort((a, b) => b.expertScore - a.expertScore);
  return filtered.slice(0, 3);
}

export function PhoneQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<typeof PHONES_DATA>([]);
  const [showResults, setShowResults] = useState(false);
  const { lang } = useLanguage();
  const t = T[lang];

  const handleOpen = () => {
    setOpen(true);
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [STEPS[step].id]: value };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setResults(getRecommendations(newAnswers));
      setShowResults(true);
    }
  };

  const handleShare = (phone: (typeof PHONES_DATA)[0]) => {
    const text = `Mere liye best phone hai ${phone.name} (${phone.price})! OmniSphere pe dekho`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        data-ocid="quiz.open_modal_button"
        className="fixed bottom-20 right-5 z-40 flex items-center gap-2 bg-[#E63946] text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
      >
        {t.quiz_btn}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            data-ocid="quiz.modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-[#E63946] p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-white font-bold text-xl">{t.quiz_btn}</h2>
                  <p className="text-white/80 text-sm">
                    5 sawaalon mein aapka perfect phone dhundho!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  data-ocid="quiz.close_button"
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-colors"
                >
                  \u2715
                </button>
              </div>

              <div className="p-6">
                {!showResults ? (
                  <>
                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E63946] rounded-full transition-all duration-500"
                          style={{
                            width: `${((step + 1) / STEPS.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium shrink-0">
                        Step {step + 1} / {STEPS.length}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-5">
                      {STEPS[step].question}
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {STEPS[step].options.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswer(opt.value)}
                          className="p-3 rounded-xl border border-border bg-card text-foreground font-medium text-sm hover:border-[#E63946] hover:bg-[#E63946]/5 transition-all duration-150 text-left"
                          data-ocid="quiz.button"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Aapke liye best phones!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Aapke jawaabon ke hisaab se yeh phones perfect match hain:
                    </p>
                    <div className="flex flex-col gap-4">
                      {results.map((phone, i) => (
                        <div
                          key={phone.id}
                          className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card"
                          data-ocid={`quiz.item.${i + 1}`}
                        >
                          <div className="text-2xl font-bold text-[#E63946] w-6 shrink-0">
                            #{i + 1}
                          </div>
                          <img
                            src={phone.imageUrl}
                            alt={phone.name}
                            crossOrigin="anonymous"
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                FALLBACK_IMAGE;
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-foreground text-sm truncate">
                              {phone.name}
                            </p>
                            <p className="text-primary font-semibold text-sm">
                              {phone.price}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {phone.specs.ram} \u2022 {phone.specs.camera}{" "}
                              \u2022 {phone.specs.battery}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleShare(phone)}
                            className="shrink-0 px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"
                            aria-label="Share on WhatsApp"
                          >
                            Share
                          </button>
                        </div>
                      ))}
                      {results.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                          Koi phone match nahi hua. Kripya dobara try karein.
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(0);
                        setAnswers({});
                        setShowResults(false);
                      }}
                      className="mt-5 w-full py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
                      data-ocid="quiz.secondary_button"
                    >
                      Dobara Koshish Karein
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
