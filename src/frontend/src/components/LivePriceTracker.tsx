import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, TrendingDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Phone } from "../data/phones";

interface PriceAlertModalProps {
  phone: Phone;
}

export function PriceAlertModal({ phone }: PriceAlertModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  const existingAlerts = (): number => {
    try {
      const alerts = JSON.parse(
        localStorage.getItem("omni_price_alerts") || "[]",
      );
      return alerts.filter((a: { phoneId: string }) => a.phoneId === phone.id)
        .length;
    } catch {
      return 0;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !targetPrice) return;
    const alerts = JSON.parse(
      localStorage.getItem("omni_price_alerts") || "[]",
    );
    alerts.push({
      phoneId: phone.id,
      phoneName: phone.name,
      email: email.trim(),
      targetPrice: Number(targetPrice),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("omni_price_alerts", JSON.stringify(alerts));
    toast.success(
      `Price alert set! We'll notify you at ${email.trim()} when ${phone.name} drops below ₹${Number(targetPrice).toLocaleString("en-IN")}`,
    );
    setOpen(false);
    setEmail("");
    setTargetPrice("");
  };

  const count = existingAlerts();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/5"
          data-ocid="price_alert.open_modal_button"
        >
          <Bell size={13} />
          Set Price Alert
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-ocid="price_alert.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            Price Alert — {phone.name}
          </DialogTitle>
          <DialogDescription>
            Get notified when price drops to your target.
            {count > 0 && (
              <span className="block mt-1 text-amber-600 dark:text-amber-400 text-xs font-medium">
                You already have {count} alert{count > 1 ? "s" : ""} for this
                phone.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="alert-email">Email Address</Label>
            <Input
              id="alert-email"
              type="email"
              placeholder="aapka@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="price_alert.input"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="alert-price">
              Target Price (current: {phone.price})
            </Label>
            <Input
              id="alert-price"
              type="number"
              placeholder={`e.g. ${phone.priceValue - 1000}`}
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
              min={1}
              data-ocid="price_alert.input"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              data-ocid="price_alert.submit_button"
            >
              Set Alert 🔔
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
}

function Sparkline({ data, width = 200, height = 56 }: SparklineProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padX = 4;
  const padY = 4;
  const W = width - padX * 2;
  const H = height - padY * 2;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * W;
    const y = padY + H - ((v - min) / range) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(" L ")} `;
  const fillD = `${pathD} L ${(padX + W).toFixed(1)},${(padY + H).toFixed(1)} L ${padX},${(padY + H).toFixed(1)} Z`;
  const formatPrice = (v: number) => `₹${(v / 1000).toFixed(1)}k`;

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxWidth: width }}
        role="img"
        aria-label="30-day price history chart"
      >
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#sparkGrad)" />
        <path
          d={pathD}
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
        <span>{formatPrice(min)} min</span>
        <span className="text-center text-muted-foreground/60">30 days</span>
        <span>{formatPrice(max)} max</span>
      </div>
    </div>
  );
}

interface LivePriceTrackerProps {
  phone: Phone;
}

export function LivePriceTracker({ phone }: LivePriceTrackerProps) {
  const lowestPrice = Math.min(phone.amazonPrice, phone.flipkartPrice);
  const lowestPlatform =
    phone.amazonPrice <= phone.flipkartPrice ? "Amazon" : "Flipkart";
  const hasPriceDrop = phone.originalPrice > phone.priceValue;
  const dropPercent = hasPriceDrop
    ? Math.round(
        ((phone.originalPrice - phone.priceValue) / phone.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
          <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">
            A
          </span>
          ₹{phone.amazonPrice.toLocaleString("en-IN")}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">
          <span className="w-4 h-4 rounded-full bg-yellow-500 text-white text-[9px] flex items-center justify-center font-bold">
            F
          </span>
          ₹{phone.flipkartPrice.toLocaleString("en-IN")}
        </span>
        <Badge className="bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30 text-[10px] px-1.5 py-0.5">
          🏷️ Lowest on {lowestPlatform}: ₹{lowestPrice.toLocaleString("en-IN")}
        </Badge>
        {hasPriceDrop && (
          <Badge className="bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 text-[10px] px-1.5 py-0.5 gap-0.5">
            <TrendingDown size={10} />
            Price Drop! {dropPercent}% off
          </Badge>
        )}
      </div>
      <Sparkline data={phone.priceHistory} width={220} height={52} />
      <PriceAlertModal phone={phone} />
    </div>
  );
}
