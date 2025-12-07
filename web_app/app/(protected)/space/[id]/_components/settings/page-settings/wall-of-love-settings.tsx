"use client";
import React from "react";
import { WALL_OF_LOVE_STYLE_CHOICES } from "@/lib/constants";
import SelectWrapper from "@/components/dropdown-wrapper";
import WallOfLovePreview from "./wall-of-love-preview";
import { useSpaceStore } from "@/store/spaceStore";
import { saveWallOfLoveSettings } from "@/actions/spaceActions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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
      ...(currentWallOfLoveSettings?.styleOptions as any),
    };

    if (selectedStyle?.extraOptions) {
      selectedStyle.extraOptions.forEach((optionObj) => {
        initialOptions[optionObj.key] =
          (currentWallOfLoveSettings?.styleOptions as any)?.[optionObj.key] ||
          optionObj.options[0].value;
      });
    }

    setSelectedExtraOptions(initialOptions);
  }, [selectedStyle, currentWallOfLoveSettings, SWITCH_DEFAULTS]);

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
      } else {
        updateWallOfLoveSettings(settings);
        console.log("Wall of love settings saved!");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="grid sm:grid-cols-2 grid-cols-1 gap-y-2 text-sm p-2"
        key="wall-of-love-page-ui"
      >
        <div key="page-style">Page Style</div>
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
        <div className="capitalize">showRating</div>
        <div className="flex items-center gap-2">
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
          <label
            htmlFor="wol-showRating"
            className="text-sm text-muted-foreground"
          >
            Show rating
          </label>
        </div>
        <div className="capitalize">showDate</div>
        <div className="flex items-center gap-2">
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
          <label
            htmlFor="wol-showDate"
            className="text-sm text-muted-foreground"
          >
            Show date
          </label>
        </div>
        {selectedStyle &&
          selectedStyle.extraOptions &&
          selectedStyle.extraOptions.map((optionObj) => (
            <React.Fragment key={optionObj.key}>
              <div className="capitalize">{optionObj.key}</div>
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
            </React.Fragment>
          ))}
      </div>
      <Button
        onClick={saveSettings}
        disabled={isSaving || !hasChanges()}
        className="mt-2"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
      {/* Preview changes */}
      <div className="relative">
        <WallOfLovePreview
          selectedStyle={selectedStyleOption}
          selectedStyleOption={selectedExtraOptions}
        />
      </div>
    </div>
  );
}
