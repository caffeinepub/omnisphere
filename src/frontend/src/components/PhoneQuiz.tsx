import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const QUIZ_PHONES = [
  {
    name: "Redmi Note 13",
    price: 13999,
    brand: "Redmi",
    has5G: true,
    priority: "Camera",
    budget: "10-20k",
    specs: "6GB RAM • 108MP • 5000mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "Realme 12x",
    price: 12999,
    brand: "Realme",
    has5G: true,
    priority: "All rounder",
    budget: "10-20k",
    specs: "6GB RAM • 50MP • 5000mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "Redmi A3",
    price: 7499,
    brand: "Redmi",
    has5G: false,
    priority: "Battery",
    budget: "Under 10k",
    specs: "4GB RAM • 50MP • 5000mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "Realme C55",
    price: 9999,
    brand: "Realme",
    has5G: false,
    priority: "Camera",
    budget: "Under 10k",
    specs: "6GB RAM • 64MP • 5000mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "iQOO Z9 Lite",
    price: 17999,
    brand: "Any",
    has5G: true,
    priority: "Performance",
    budget: "15-20k",
    specs: "8GB RAM • 50MP • 5000mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "Samsung M35",
    price: 19999,
    brand: "Samsung",
    has5G: true,
    priority: "Battery",
    budget: "15-20k",
    specs: "8GB RAM • 50MP • 6000mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "OnePlus Nord CE4",
    price: 24999,
    brand: "OnePlus",
    has5G: true,
    priority: "Performance",
    budget: "20-30k",
    specs: "8GB RAM • 50MP • 5500mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "Realme GT 6T",
    price: 29999,
    brand: "Realme",
    has5G: true,
    priority: "All rounder",
    budget: "20-30k",
    specs: "12GB RAM • 50MP • 5500mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "Samsung S24 FE",
    price: 35999,
    brand: "Samsung",
    has5G: true,
    priority: "Camera",
    budget: "30k+",
    specs: "8GB RAM • 50MP • 4700mAh",
    amazonUrl: "https://amazon.in",
  },
  {
    name: "OnePlus 12R",
    price: 39999,
    brand: "OnePlus",
    has5G: true,
    priority: "Performance",
    budget: "30k+",
    specs: "8GB RAM • 50MP • 5500mAh",
    amazonUrl: "https://amazon.in",
  },
];

const STEPS = [
  {
    question: "Budget kya hai?",
    key: "budget",
    options: ["Under 10k", "10-20k", "20-30k", "30k+"],
  },
  {
    question: "Sabse important feature?",
    key: "priority",
    options: ["Camera", "Battery", "Performance", "All rounder"],
  },
  {
    question: "Phone ka main use?",
    key: "usage",
    options: ["Gaming", "Social Media", "Business", "Basic use"],
  },
  {
    question: "5G chahiye?",
    key: "needs5G",
    options: ["Yes", "No", "Don't care"],
  },
  {
    question: "Brand preference?",
    key: "brand",
    options: ["Redmi", "Realme", "Samsung", "OnePlus", "Any"],
  },
];

type Answers = Record<string, string>;

function getResults(answers: Answers) {
  const scored = QUIZ_PHONES.map((phone) => {
    let score = 0;
    if (phone.budget === answers.budget) score += 3;
    if (phone.priority === answers.priority) score += 2;
    if (
      answers.brand === "Any" ||
      phone.brand === answers.brand ||
      phone.brand === "Any"
    )
      score += 1;
    if (answers.needs5G === "Yes" && phone.has5G) score += 1;
    if (answers.needs5G === "No" && !phone.has5G) score += 1;
    if (answers.needs5G === "Don't care") score += 0.5;
    return { ...phone, score };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

export function PhoneQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<typeof QUIZ_PHONES | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setStep(0);
    setAnswers({});
    setResults(null);
  };
  const handleClose = () => setOpen(false);

  const handleAnswer = (value: string) => {
    const key = STEPS[step].key;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setResults(getResults(newAnswers));
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        data-ocid="quiz.open_modal_button"
        className="fixed bottom-20 right-5 z-40 flex items-center gap-2 bg-[#E63946] text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
      >
        <span className="text-base">📱</span>
        Find My Phone
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
                  <h2 className="text-white font-bold text-xl">
                    📱 Find My Phone
                  </h2>
                  <p className="text-white/80 text-sm">
                    Perfect phone dhundhne mein madad karta hoon!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  data-ocid="quiz.close_button"
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-6">
                {!results ? (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>
                          Step {step + 1} of {STEPS.length}
                        </span>
                        <span>
                          {Math.round((step / STEPS.length) * 100)}% Complete
                        </span>
                      </div>
                      <Progress
                        value={(step / STEPS.length) * 100}
                        className="h-2"
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-lg font-bold text-foreground mb-4">
                          {STEPS[step].question}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {STEPS[step].options.map((option) => (
                            <button
                              type="button"
                              key={option}
                              onClick={() => handleAnswer(option)}
                              data-ocid={`quiz.step.${step + 1}` as any}
                              className="p-3 rounded-xl border-2 border-border bg-card text-card-foreground font-semibold text-sm hover:border-[#E63946] hover:bg-[#E63946]/5 hover:text-[#E63946] transition-all duration-150 text-left"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-center mb-5">
                      <div className="text-3xl mb-2">🎯</div>
                      <h3 className="text-xl font-bold text-foreground">
                        Tumhare liye Best Phones!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Answers ke basis par top 3 phones
                      </p>
                    </div>

                    <div className="space-y-3 mb-5">
                      {results.map((phone, i) => (
                        <div
                          key={phone.name}
                          data-ocid={`quiz.result.item.${i + 1}` as any}
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-border bg-card gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                              #{i + 1}
                            </div>
                            <div>
                              <p className="font-bold text-foreground text-sm">
                                {phone.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {phone.specs}
                              </p>
                              <p className="text-sm font-bold text-[#E63946]">
                                ₹{phone.price.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            <a
                              href={phone.amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-ocid={`quiz.amazon_button.${i + 1}` as any}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FF9900] text-white hover:opacity-90 transition-opacity text-center"
                            >
                              Amazon
                            </a>
                            <a
                              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Mere liye best phone hai ${phone.name}! Check karo: https://omnisphere.in`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-ocid={`quiz.whatsapp_button.${i + 1}` as any}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-green-600 text-white hover:opacity-90 transition-opacity text-center"
                            >
                              Share
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleRestart}
                      variant="outline"
                      className="w-full border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white"
                    >
                      🔄 Quiz Dobara Lena
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
