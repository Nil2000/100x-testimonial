import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
type SelectWrapperProps = {
  defaultOption: string;
  options: string[];
  changeSelectedOption: (option: string) => void;
};

export default function SelectWrapper({
  defaultOption,
  options,
  changeSelectedOption,
}: SelectWrapperProps) {
  return (
    <Select
      defaultValue={defaultOption}
      onValueChange={(value) => changeSelectedOption(value)}
    >
      <SelectTrigger>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent className="font-sans">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
