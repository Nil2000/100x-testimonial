import clsx from "clsx";
import { Columns3, GalleryHorizontal, MoveHorizontal } from "lucide-react";
import { WALL_OF_LOVE_LAYOUTS, type WallOfLoveLayout } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type {
  WallOfLoveCount,
  WallOfLoveStyleOptions,
} from "@/lib/wall-of-love-settings";

const LAYOUT_ICONS: Record<WallOfLoveLayout["value"], typeof Columns3> = {
  list: Columns3,
  carousel: GalleryHorizontal,
  infiniteScrollHorizontal: MoveHorizontal,
};

type Props = {
  selectedStyle: WallOfLoveLayout["value"];
  styleOptions: WallOfLoveStyleOptions;
  onStyleChange: (style: WallOfLoveLayout["value"]) => void;
  onCountChange: (value: WallOfLoveCount) => void;
  onShowRatingChange: (checked: boolean) => void;
  disabled?: boolean;
};

export default function WallOfLoveLayoutPicker({
  selectedStyle,
  styleOptions,
  onStyleChange,
  onCountChange,
  onShowRatingChange,
  disabled,
}: Props) {
  const selectedLayout = WALL_OF_LOVE_LAYOUTS.find(
    (layout) => layout.value === selectedStyle,
  );
  const currentCount =
    selectedLayout?.countOption === "rows"
      ? styleOptions.rows
      : styleOptions.columns;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Layout</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WALL_OF_LOVE_LAYOUTS.map((layout) => {
            const Icon = LAYOUT_ICONS[layout.value];
            const isSelected = layout.value === selectedStyle;
            return (
              <button
                key={layout.value}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                onClick={() => onStyleChange(layout.value)}
                className={clsx(
                  "rounded-lg border-2 p-4 text-left transition-all duration-200 hover:shadow-md",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 bg-card",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <Icon className="w-5 h-5 mb-2 text-primary" />
                <h4 className="font-semibold text-sm mb-1">{layout.label}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {layout.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedLayout && (
        <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-center">
          <Label className="text-sm font-medium">
            {selectedLayout.countLabel}
          </Label>
          <div className="flex gap-2">
            {selectedLayout.countChoices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                disabled={disabled}
                aria-pressed={currentCount === choice.value}
                onClick={() => onCountChange(choice.value)}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-sm font-medium border transition-colors",
                  currentCount === choice.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label
            htmlFor="wol-showRating"
            className="text-sm font-medium cursor-pointer"
          >
            Show Rating
          </Label>
          <p className="text-xs text-muted-foreground">
            Display star ratings on testimonial cards
          </p>
        </div>
        <Switch
          checked={styleOptions.showRating !== "false"}
          onCheckedChange={onShowRatingChange}
          disabled={disabled}
          id="wol-showRating"
        />
      </div>
    </div>
  );
}
