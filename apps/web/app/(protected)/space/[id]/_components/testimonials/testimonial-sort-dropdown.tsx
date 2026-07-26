import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

type Props = {
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export default function SortByDropDown({ onChange, defaultValue }: Props) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-[220px] bg-background">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:flex [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0 font-sans">
        <SelectItem value="name-asc">
          <ArrowDownAZ size={16} />
          <span className="truncate">Name (Ascending)</span>
        </SelectItem>
        <SelectItem value="name-desc">
          <ArrowUpAZ size={16} />
          <span className="truncate">Name (Descending)</span>
        </SelectItem>
        <SelectItem value="newest-first">
          <CalendarArrowUp size={16} />
          <span className="truncate">Newest First</span>
        </SelectItem>
        <SelectItem value="oldest-first">
          <CalendarArrowDown size={16} />
          <span className="truncate">Oldest First</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
