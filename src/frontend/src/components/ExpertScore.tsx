import { useEffect, useRef, useState } from "react";
import type { Phone } from "../data/phones";

function getScoreColor(score: number): string {
  if (score >= 8) return "#22c55e";
  if (score >= 6) return "#f97316";
  return "#ef4444";
}

function getScoreLabel(score: number): string {
  if (score >= 8) return "Excellent";
  if (score >= 6) return "Good";
  return "Average";
}

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

function ScoreGauge({ score, size = 88 }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(0);
  const ref = useRef<SVGCircleElement>(null);
  const r = (size - 12) / 2;
  const circumference = 2 * Math.PI * r;
  const color = getScoreColor(score);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimated(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const dashOffset = circumference - (animated / 10) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={`Score: ${score} out of 10`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted/40"
        />
        <circle
          ref={ref}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold leading-none" style={{ color }}>
          {score.toFixed(1)}
        </span>
        <span className="text-[10px] text-muted-foreground">/10</span>
      </div>
    </div>
  );
}

interface SubScoreBarProps {
  label: string;
  score: number;
}

function SubScoreBar({ label, score }: SubScoreBarProps) {
  const [width, setWidth] = useState(0);
  const color = getScoreColor(score);

  useEffect(() => {
    const t = setTimeout(() => setWidth(score * 10), 200);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-28 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold w-6 text-right" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

interface ExpertScoreProps {
  phone: Phone;
  compact?: boolean;
}

export function ExpertScore({ phone, compact = false }: ExpertScoreProps) {
  const { expertScore, subScores, isRecommended } = phone;
  const label = getScoreLabel(expertScore);
  const color = getScoreColor(expertScore);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <ScoreGauge score={expertScore} size={56} />
        <div>
          <p className="text-xs font-semibold" style={{ color }}>
            {label}
          </p>
          {isRecommended && (
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ⭐ Recommended
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <ScoreGauge score={expertScore} size={88} />
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ color }}>
            {label}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Expert Score by OmniSphere
          </p>
          {isRecommended && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[11px] font-semibold">
              ⭐ OmniSphere Recommended
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <SubScoreBar label="Design" score={subScores.design} />
        <SubScoreBar label="Camera" score={subScores.camera} />
        <SubScoreBar label="Battery" score={subScores.battery} />
        <SubScoreBar label="Performance" score={subScores.performance} />
        <SubScoreBar label="Value for Money" score={subScores.valueForMoney} />
      </div>
    </div>
  );
}
