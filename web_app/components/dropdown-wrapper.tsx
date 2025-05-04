import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";

type Props = {
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  listOfItems?: {
    name: string;
    value: string;
  }[];
  disabled?: boolean;
};

export default function SelectWrapper({
  onChange,
  defaultValue,
  placeholder,
  listOfItems,
  disabled,
}: Props) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-[220px] bg-background">
        <SelectValue placeholder={placeholder || "Select one"} />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:flex [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0 font-sans">
        {listOfItems?.map((item, index) => (
          <SelectItem value={item.value} key={index}>
            <span className="truncate">{item.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
