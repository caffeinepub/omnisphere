import { useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import type { Phone } from "../data/phones";
import { FALLBACK_IMAGE } from "../data/phones";

interface QuickSpecsPopupProps {
  phone: Phone;
  children: React.ReactNode;
}

const SPEC_STAR_KEYS = ["ss1", "ss2", "ss3", "ss4", "ss5"];

export function QuickSpecsPopup({ phone, children }: QuickSpecsPopupProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const clearHide = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const scheduleHide = () => {
    hideTimeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  const showPopup = () => {
    clearHide();
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popupW = 260;
    const popupH = 320;
    let left = rect.left + rect.width / 2 - popupW / 2 + window.scrollX;
    let top = rect.bottom + 8 + window.scrollY;
    if (left + popupW > window.innerWidth + window.scrollX - 8)
      left = window.innerWidth + window.scrollX - popupW - 8;
    if (left < 8) left = 8;
    if (top + popupH > window.innerHeight + window.scrollY - 8)
      top = rect.top - popupH - 8 + window.scrollY;
    setPosition({ top, left });
    setVisible(true);
  };

  const handleTouchStart = () => {
    longPressRef.current = setTimeout(showPopup, 500);
  };

  const handleTouchEnd = () => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
    scheduleHide();
  };

  const handleFullReview = () => {
    setVisible(false);
    const slug = phone.reviewSlug
      ? `/article/${phone.reviewSlug}`
      : "/category/reviews";
    navigate({ to: slug });
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (longPressRef.current) clearTimeout(longPressRef.current);
    };
  }, []);

  const specs = [
    phone.specs.display,
    phone.specs.processor,
    phone.specs.ram,
    phone.specs.camera,
    phone.specs.battery,
  ];

  const popup = visible
    ? ReactDOM.createPortal(
        <div
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: 9999,
            width: 260,
          }}
          className="bg-card border border-border rounded-xl shadow-2xl p-3 pointer-events-auto"
          onMouseEnter={clearHide}
          onMouseLeave={scheduleHide}
        >
          <div
            style={{
              opacity: 1,
              transform: "translateY(0) scale(1)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            <img
              src={phone.imageUrl}
              alt={phone.name}
              crossOrigin="anonymous"
              className="w-full h-28 object-cover rounded-lg mb-2"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            <p className="font-bold text-sm text-foreground mb-1">
              {phone.name}
            </p>
            <p className="text-primary font-semibold text-sm mb-2">
              {phone.price}
            </p>
            <div className="flex mb-2">
              {SPEC_STAR_KEYS.map((key, i) => (
                <Star
                  key={key}
                  size={12}
                  className={
                    i < Math.round(phone.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <div className="space-y-1 mb-3">
              {specs.map((spec) => (
                <p
                  key={spec}
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-primary inline-block shrink-0" />
                  {spec}
                </p>
              ))}
            </div>
            <button
              type="button"
              data-ocid="phone.review.button"
              onClick={handleFullReview}
              className="w-full text-xs bg-primary text-primary-foreground rounded-lg py-1.5 font-semibold hover:bg-primary/90 transition-colors"
            >
              Full Review →
            </button>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="cursor-pointer hover:text-primary transition-colors"
        onMouseEnter={showPopup}
        onMouseLeave={scheduleHide}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </span>
      {popup}
    </>
  );
}
