import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type FontOption = { family: string; category: string };

type BrandingOptionsProps = {
  noTheme: boolean;
  onNoThemeChange: (checked: boolean) => void;
  showBrandLogo: boolean;
  onShowBrandLogoChange: (checked: boolean) => void;
  canCustomBrand: boolean;
  font: string;
  onFontChange: (font: string) => void;
  fontList: FontOption[];
};

export default function BrandingOptions({
  noTheme,
  onNoThemeChange,
  showBrandLogo,
  onShowBrandLogoChange,
  canCustomBrand,
  font,
  onFontChange,
  fontList,
}: BrandingOptionsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Theme Options
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="theme-switch" className="font-medium text-sm cursor-pointer">
                No Theme
              </Label>
              <p className="text-xs text-muted-foreground">
                Use default styling without a theme
              </p>
            </div>
            <Switch
              id="theme-switch"
              checked={noTheme}
              onCheckedChange={onNoThemeChange}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="brand-logo-switch" className="font-medium text-sm cursor-pointer">
                  Show Brand Logo
                </Label>
                {!canCustomBrand && (
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                    Pro
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {canCustomBrand ? (
                  "Display your logo on the page"
                ) : (
                  <>
                    Available on Professional plan and above.{" "}
                    <Link href="/buy-premium" className="text-primary underline underline-offset-2">
                      Upgrade
                    </Link>
                  </>
                )}
              </p>
            </div>
            <Switch
              id="brand-logo-switch"
              checked={showBrandLogo}
              onCheckedChange={onShowBrandLogoChange}
              disabled={!canCustomBrand}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="font-select" className="text-sm font-medium text-foreground">
            Font Family
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            {canCustomBrand ? (
              "Select the typography for your page"
            ) : (
              <>
                Available on Professional plan and above.{" "}
                <Link href="/buy-premium" className="text-primary underline underline-offset-2">
                  Upgrade
                </Link>
              </>
            )}
          </p>
        </div>
        <Select
          value={font}
          onValueChange={onFontChange}
          disabled={!canCustomBrand}
        >
          <SelectTrigger id="font-select" className="w-full max-w-md">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent className="font-sans max-h-72 overflow-y-auto">
            {fontList.map((font) => (
              <SelectItem key={font.family} value={font.family}>
                {font.family}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
