"use client";
import { updateThanksSpace } from "@/actions/spaceActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { thankyouSchema } from "@/schemas/spaceSchema";
import { useSpaceStore } from "@/store/spaceStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

export default function ThankYouForm() {
  const { spaceInfo, updateThanksField } = useSpaceStore();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof thankyouSchema>>({
    resolver: zodResolver(thankyouSchema),
    defaultValues: {
      id: spaceInfo.thanksSpace.id,
      title: spaceInfo.thanksSpace.title || "Thank you",
      message: spaceInfo.thanksSpace.message || "Thank you for your feedback",
    },
  });

  const onSubmit = async (data: z.infer<typeof thankyouSchema>) => {
    console.log(data);
    startTransition(() => {
      updateThanksSpace(data).then((res) => {
        if (res.error) {
          console.error("Failed to update thanks space", res.error);
          toast.error("Failed to update thank you page. Please try again.");
          return;
        }
        console.log("Thanks space updated successfully");
        toast.success("Thank you page updated successfully!");
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="title">
          Thank you title<span className="text-destructive">*</span>
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <>
              <Input
                type="text"
                className="input"
                placeholder="Thank you title"
                onChange={(e) => {
                  field.onChange(e);
                  updateThanksField("title", e.target.value);
                }}
                value={field.value}
              />
              <p className="text-destructive text-xs">
                {errors.title && errors.title.message}
              </p>
            </>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">
          Thank you title<span className="text-destructive">*</span>
        </Label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <>
              <Textarea
                className="input"
                placeholder="Thank you me"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  updateThanksField("message", e.target.value);
                }}
              />
              <p className="text-destructive text-xs">
                {errors.title && errors.title.message}
              </p>
            </>
          )}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full sm:max-w-[300px]"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Save thanks view"
          )}
        </Button>
      </div>
    </form>
  );
}
