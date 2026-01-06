import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Below Average",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

export const StarRatingInput = ({ value, onChange, disabled }: StarRatingInputProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || value;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className={cn(
              "p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
              disabled && "cursor-not-allowed opacity-50"
            )}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star
              className={cn(
                "w-8 h-8 transition-colors",
                star <= displayValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-muted-foreground/40"
              )}
            />
          </button>
        ))}
      </div>
      {displayValue > 0 && (
        <p className="text-sm text-muted-foreground">
          {ratingLabels[displayValue]}
        </p>
      )}
    </div>
  );
};
