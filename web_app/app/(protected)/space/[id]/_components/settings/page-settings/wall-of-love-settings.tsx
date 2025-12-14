"use client";
import React from "react";
import { WALL_OF_LOVE_STYLE_CHOICES } from "@/lib/constants";
import SelectWrapper from "@/components/dropdown-wrapper";
import WallOfLovePreview from "./wall-of-love-preview";
import { useSpaceStore } from "@/store/spaceStore";
import { saveWallOfLoveSettings } from "@/actions/spaceActions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function WallOfLovePage() {
  const { spaceInfo, updateWallOfLoveSettings } = useSpaceStore();

  const SWITCH_DEFAULTS = React.useMemo(
    () => ({
      showRating: "true",
      showDate: "true",
    }),
    []
  );

  // Initialize state from store or defaults
  const currentWallOfLoveSettings = spaceInfo.theme?.wallOfLove;
  const [selectedStyleOption, setSelectedStyleOption] = React.useState<string>(
    currentWallOfLoveSettings?.style || WALL_OF_LOVE_STYLE_CHOICES[0].value
  );
  const [selectedExtraOptions, setSelectedExtraOptions] = React.useState<any>(
    currentWallOfLoveSettings?.styleOptions || {}
  );
  const [isSaving, setIsSaving] = React.useState(false);

  const selectedStyle = WALL_OF_LOVE_STYLE_CHOICES.find(
    (choice) => choice.value === selectedStyleOption
  );

  React.useEffect(() => {
    const initialOptions: any = {
      ...SWITCH_DEFAULTS,
    };

    if (selectedStyle?.extraOptions) {
      selectedStyle.extraOptions.forEach((optionObj) => {
        initialOptions[optionObj.key] = optionObj.options[0].value;
      });
    }

    setSelectedExtraOptions(initialOptions);
  }, [selectedStyleOption, SWITCH_DEFAULTS]);

  // Function to check if current settings are different from saved settings
  const hasChanges = () => {
    const currentStyle =
      currentWallOfLoveSettings?.style || WALL_OF_LOVE_STYLE_CHOICES[0].value;
    const currentStyleOptions = currentWallOfLoveSettings?.styleOptions || {};

    // Check if style has changed
    if (selectedStyleOption !== currentStyle) {
      return true;
    }

    // Check if style options have changed
    const currentKeys = Object.keys(currentStyleOptions);
    const selectedKeys = Object.keys(selectedExtraOptions);

    // If number of keys is different
    if (currentKeys.length !== selectedKeys.length) {
      return true;
    }

    // Check if any option value has changed
    for (const key of selectedKeys) {
      if ((currentStyleOptions as any)[key] !== selectedExtraOptions[key]) {
        return true;
      }
    }

    return false;
  };

  // Save settings function
  const saveSettings = async () => {
    if (!spaceInfo.id) return;

    setIsSaving(true);
    try {
      const settings = {
        style: selectedStyleOption,
        styleOptions: selectedExtraOptions,
      };

      const result = await saveWallOfLoveSettings(spaceInfo.id, settings);

      if (result.error) {
        console.error("Failed to save settings:", result.error);
        toast.error("Failed to save settings");
      } else {
        updateWallOfLoveSettings(settings);
        toast.success("Wall of love settings saved!");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Layout Style Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-3">Layout Style</h3>
            <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-center">
              <Label htmlFor="page-style" className="text-sm font-medium">
                Display Style
              </Label>
              <SelectWrapper
                key="page-style-select"
                defaultValue={selectedStyleOption}
                listOfItems={WALL_OF_LOVE_STYLE_CHOICES.map((choice) => ({
                  name: choice.label,
                  value: choice.value,
                }))}
                onChange={(value) => {
                  setSelectedStyleOption(value);
                }}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* Style-specific options */}
          {selectedStyle && selectedStyle.extraOptions && (
            <div className="space-y-3">
              {selectedStyle.extraOptions.map((optionObj) => (
                <div
                  key={optionObj.key}
                  className="grid sm:grid-cols-[200px_1fr] gap-4 items-center"
                >
                  <Label className="text-sm font-medium capitalize">
                    {optionObj.key === "cardVariant"
                      ? "Card Style"
                      : optionObj.key}
                  </Label>
                  <SelectWrapper
                    defaultValue={
                      selectedExtraOptions[optionObj.key] ||
                      optionObj.options[0].value
                    }
                    listOfItems={optionObj.options.map((opt: any) => ({
                      name: opt.label,
                      value: opt.value,
                    }))}
                    onChange={(value) => {
                      setSelectedExtraOptions((prev: any) => ({
                        ...prev,
                        [optionObj.key]: value,
                      }));
                    }}
                    disabled={isSaving}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Display Options Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Display Options</h3>
          <div className="space-y-4">
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
                checked={selectedExtraOptions.showRating !== "false"}
                onCheckedChange={(checked) => {
                  setSelectedExtraOptions((prev: any) => ({
                    ...prev,
                    showRating: checked ? "true" : "false",
                  }));
                }}
                disabled={isSaving}
                id="wol-showRating"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="wol-showDate"
                  className="text-sm font-medium cursor-pointer"
                >
                  Show Date
                </Label>
                <p className="text-xs text-muted-foreground">
                  Display submission date on testimonial cards
                </p>
              </div>
              <Switch
                checked={selectedExtraOptions.showDate !== "false"}
                onCheckedChange={(checked) => {
                  setSelectedExtraOptions((prev: any) => ({
                    ...prev,
                    showDate: checked ? "true" : "false",
                  }));
                }}
                disabled={isSaving}
                id="wol-showDate"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={saveSettings}
            disabled={isSaving || !hasChanges()}
            size="lg"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your Wall of Love will look with the current settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WallOfLovePreview
            selectedStyle={selectedStyleOption}
            selectedStyleOption={selectedExtraOptions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
