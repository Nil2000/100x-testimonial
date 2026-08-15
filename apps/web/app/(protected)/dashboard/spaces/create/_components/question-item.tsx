"use client";

import { Input } from "@/components/ui/input";
import { useId } from "react";
import { GripVerticalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

export default function QuestionItem({
  question,
  maxLength,
  position,
  dragHandleProps,
  handleDelete,
  handleInputChange,
}: {
  maxLength: number;
  question: string;
  position?: number;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  handleDelete: () => void;
  handleInputChange: (value: string) => void;
}) {
  const id = useId();
  const label = position ? `Question ${position}` : "Question";

  return (
    <div className="flex items-center gap-2">
      <span
        {...dragHandleProps}
        aria-label={`Reorder ${label.toLowerCase()}`}
        className="flex h-9 w-5 shrink-0 cursor-grab items-center justify-center text-muted-foreground active:cursor-grabbing"
      >
        <GripVerticalIcon size={16} />
      </span>
      <div className="relative flex-1">
        <Input
          id={id}
          className="peer pe-14"
          type="text"
          value={question}
          maxLength={maxLength}
          onChange={(e) => handleInputChange(e.target.value)}
          aria-label={label}
          aria-describedby={`${id}-description`}
          placeholder="Keep it short"
        />
        <div
          id={`${id}-description`}
          className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
          aria-live="polite"
          role="status"
        >
          {question.length}/{maxLength}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        aria-label={`Delete ${label.toLowerCase()}`}
        className="shrink-0 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
