import React from "react";
import { WALL_OF_LOVE_STYLE_CHOICES } from "@/lib/constants";
import SelectWrapper from "@/components/dropdown-wrapper";
import WallOfLovePreviewContainer from "./wall-of-love-preview-container";

export default function WallOfLovePage() {
  const [selectedStyleOption, setSelectedStyleOption] = React.useState<string>(
    WALL_OF_LOVE_STYLE_CHOICES[0].value
  );
  const [selectedExtraOptions, setSelectedExtraOptions] = React.useState<any>(
    {}
  );
  const selectedStyle = WALL_OF_LOVE_STYLE_CHOICES.find(
    (choice) => choice.value === selectedStyleOption
  );
  React.useEffect(() => {
    if (selectedStyle && selectedStyle.extraOptions) {
      const initialOptions: any = {};
      selectedStyle.extraOptions.forEach((optionObj) => {
        initialOptions[optionObj.key] = optionObj.options[0].value;
      });
      setSelectedExtraOptions(initialOptions);
    } else {
      setSelectedExtraOptions({});
    }
  }, [selectedStyle]);
  return (
    <div>
      <div
        className="grid grid-cols-2 gap-y-2 text-sm p-2"
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
        />
        {selectedStyle &&
          selectedStyle.extraOptions &&
          selectedStyle.extraOptions.map((optionObj) => (
            <>
              <div key={optionObj.key + "-label"} className="capitalize">
                {optionObj.key}
              </div>
              <SelectWrapper
                key={optionObj.key + "-select"}
                defaultValue={optionObj.options[0].value}
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
              />
            </>
          ))}
      </div>
      {/* Prview changes */}
      <WallOfLovePreviewContainer
        selectedStyle={selectedStyleOption}
        selectedStyleOption={selectedExtraOptions}
      />
    </div>
  );
}
