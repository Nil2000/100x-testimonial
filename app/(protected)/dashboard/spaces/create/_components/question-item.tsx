"use client";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { GripVerticalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuestionItem({
  question,
  maxLength,
  handleDelete,
  handleInputChange,
}: {
  maxLength: number;
  question: string;
  handleDelete: () => void;
  handleInputChange: (value: string) => void;
}) {
  const id = useId();
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength, initialValue: question });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value);
    handleChange(e);
  };

  return (
    <div className="flex items-center space-x-3">
      <GripVerticalIcon
        className="cursor-move text-muted-foreground"
        height={20}
        width={20}
      />
      <div className="relative flex-1">
        <Input
          id={id}
          className="peer pe-14"
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={handleInput}
          aria-describedby={`${id}-description`}
          placeholder="Keep it short"
        />
        <div
          id={`${id}-description`}
          className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
          aria-live="polite"
          role="status"
        >
          {characterCount}/{limit}
        </div>
      </div>
      <Button
        variant={"ghost"}
        className="text-muted-foreground hover:text-red-500 p-0 mx-3"
        onClick={handleDelete}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
