import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
  spaceName: string;
  headline: string;
  subtitle: string;
  onHeadlineChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  hideBranding: boolean;
  onHideBrandingChange: (checked: boolean) => void;
  canCustomBrand: boolean;
  disabled?: boolean;
};

export default function WallOfLoveChromeOptions({
  spaceName,
  headline,
  subtitle,
  onHeadlineChange,
  onSubtitleChange,
  hideBranding,
  onHideBrandingChange,
  canCustomBrand,
  disabled,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Page Text</h3>

      <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-center">
        <Label htmlFor="wol-headline" className="text-sm font-medium">
          Headline
        </Label>
        <Input
          id="wol-headline"
          value={headline}
          onChange={(e) => onHeadlineChange(e.target.value)}
          placeholder={`What people say about ${spaceName}`}
          maxLength={120}
          disabled={disabled}
        />
      </div>

      <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-center">
        <Label htmlFor="wol-subtitle" className="text-sm font-medium">
          Subtitle
        </Label>
        <Input
          id="wol-subtitle"
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          placeholder="Real stories from real people. Every testimonial below is a genuine voice from our community."
          maxLength={200}
          disabled={disabled}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="wol-hideBranding"
              className="font-medium text-sm cursor-pointer"
            >
              Hide TestiFlow Branding
            </Label>
            {!canCustomBrand && (
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                Pro
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {canCustomBrand ? (
              "Remove the TestiFlow logo and links from your Wall of Love"
            ) : (
              <>
                Available on Professional plan and above.{" "}
                <Link
                  href="/buy-premium"
                  className="text-primary underline underline-offset-2"
                >
                  Upgrade
                </Link>
              </>
            )}
          </p>
        </div>
        <Switch
          id="wol-hideBranding"
          checked={hideBranding}
          onCheckedChange={onHideBrandingChange}
          disabled={disabled || !canCustomBrand}
        />
      </div>
    </div>
  );
}
