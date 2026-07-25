import React from "react";
import SelectWithSearch from "./select-with-search";
import { useFont } from "@/hooks/useFont";

type FontPickerProps = {
  selectedFont?: string;
  onSelect: (font: string) => void;
};

export default function FontPicker({
  onSelect,
  selectedFont,
}: FontPickerProps) {
  const { fontList, handleFontSelect } = useFont();

  return (
    <SelectWithSearch
      listOfItems={fontList.map((font) => ({
        label: font.family,
        value: font.family,
      }))}
      onSelect={(value) => {
        handleFontSelect(value);
        onSelect(value);
      }}
      value={selectedFont}
    />
  );
}
