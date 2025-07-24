"use client";
import React from "react";
import { WALL_OF_LOVE_STYLE_CHOICES } from "@/lib/constants";
import SelectWrapper from "@/components/dropdown-wrapper";
import WallOfLovePreviewContainer from "./wall-of-love-preview-container";
import { useSpaceStore } from "@/store/spaceStore";
import { saveWallOfLoveSettings } from "@/actions/spaceActions";
import { Button } from "@/components/ui/button";

export default function WallOfLovePage() {
  const { spaceInfo, updateWallOfLoveSettings } = useSpaceStore();

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
    if (selectedStyle && selectedStyle.extraOptions) {
      const initialOptions: any = {};
      selectedStyle.extraOptions.forEach((optionObj) => {
        initialOptions[optionObj.key] =
          (currentWallOfLoveSettings?.styleOptions as any)?.[optionObj.key] ||
          optionObj.options[0].value;
      });
      setSelectedExtraOptions(initialOptions);
    } else {
      setSelectedExtraOptions({});
    }
  }, [selectedStyle, currentWallOfLoveSettings]);

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
      <Button onClick={saveSettings} disabled={isSaving} className="mt-2">
        {isSaving ? "Saving..." : "Save Settings"}
      </Button>
      {/* Preview changes */}
      <div className="relative">
        <WallOfLovePreviewContainer
          selectedStyle={selectedStyleOption}
          selectedStyleOption={selectedExtraOptions}
        />
      </div>
    </div>
  );
}
