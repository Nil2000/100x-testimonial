import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { feedbackConstants } from "@/lib/constants";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { VideoFeedback } from "@/schemas/videoFeedbackSchema";

export default function CollectStarVideoRatings({
  field,
}: {
  field: ControllerRenderProps<VideoFeedback, "rating">;
}) {
  return (
    <>
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium leading-none text-foreground">
          How likely are you to recommend us?
        </legend>
        <RadioGroup
          className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
          defaultValue={field.value.toString()}
          onValueChange={(value) => field.onChange(Number(value))}
        >
          {feedbackConstants.map((value) => (
            <label
              key={value}
              className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm font-medium outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
            >
              <RadioGroupItem
                value={value}
                className="sr-only after:absolute after:inset-0"
              />
              {value}
            </label>
          ))}
        </RadioGroup>
      </fieldset>
      <div className="mt-1 flex justify-between text-xs font-medium">
        <p>
          <span className="text-base">😡</span> Not likely
        </p>
        <p>
          Very Likely <span className="text-base">😍</span>
        </p>
      </div>
    </>
  );
}
