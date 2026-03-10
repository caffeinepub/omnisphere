import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const BANKS = [
  { label: "HDFC Bank", rate: 10.5 },
  { label: "SBI Bank", rate: 10.0 },
  { label: "ICICI Bank", rate: 11.0 },
  { label: "Axis Bank", rate: 10.75 },
  { label: "All Banks (Avg)", rate: 10.5 },
];

const TENURES = [3, 6, 9, 12];

function calcEMI(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const emi = (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  return emi;
}

interface EmiResult {
  monthly: number;
  total: number;
  interest: number;
}

interface Props {
  defaultPrice?: number;
}

export function EmiCalculator({ defaultPrice = 20000 }: Props) {
  const [price, setPrice] = useState(String(defaultPrice));
  const [tenure, setTenure] = useState("6");
  const [bank, setBank] = useState("HDFC Bank");
  const [result, setResult] = useState<EmiResult | null>(null);

  const handleCalculate = () => {
    const principal = Number.parseFloat(price);
    if (!principal || principal <= 0) return;
    const selectedBank = BANKS.find((b) => b.label === bank) ?? BANKS[0];
    const months = Number.parseInt(tenure, 10);
    const monthly = calcEMI(principal, selectedBank.rate, months);
    const total = monthly * months;
    const interest = total - principal;
    setResult({ monthly, total, interest });
  };

  const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <section
      data-ocid="emi.section"
      className="bg-muted/30 border-y border-border py-14"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              📱 EMI Calculator
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Monthly EMI calculate karo apne phone ke liye
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {/* Price */}
              <div className="sm:col-span-1">
                <Label className="text-sm font-semibold mb-1.5 block">
                  Phone Price (₹)
                </Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 20000"
                  min="0"
                  data-ocid="emi.price_input"
                />
              </div>

              {/* Tenure */}
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">
                  Tenure (Months)
                </Label>
                <Select value={tenure} onValueChange={setTenure}>
                  <SelectTrigger data-ocid="emi.tenure_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TENURES.map((t) => (
                      <SelectItem key={t} value={String(t)}>
                        {t} Months
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bank */}
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">
                  Bank
                </Label>
                <Select value={bank} onValueChange={setBank}>
                  <SelectTrigger data-ocid="emi.bank_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BANKS.map((b) => (
                      <SelectItem key={b.label} value={b.label}>
                        {b.label} ({b.rate}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white font-bold py-2.5"
              data-ocid="emi.calculate_button"
            >
              Calculate EMI 💰
            </Button>

            {/* Results */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  data-ocid="emi.result.panel"
                  className="mt-5 p-5 bg-[#E63946]/5 border border-[#E63946]/20 rounded-xl"
                >
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">
                        Monthly EMI
                      </p>
                      <p className="text-xl font-black text-[#E63946]">
                        {fmt(result.monthly)}
                      </p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-xs text-muted-foreground mb-1">
                        Total Payable
                      </p>
                      <p className="text-xl font-black text-foreground">
                        {fmt(result.total)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">
                        Total Interest
                      </p>
                      <p className="text-xl font-black text-foreground">
                        {fmt(result.interest)}
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://amazon.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="emi.apply_button"
                    className="block w-full text-center bg-[#FF9900] text-black font-bold py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
                  >
                    Apply for EMI on Amazon 🛒
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
