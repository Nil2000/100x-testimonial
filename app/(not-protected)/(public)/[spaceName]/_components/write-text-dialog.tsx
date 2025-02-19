import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pen } from "lucide-react";
import React, { useTransition } from "react";
import CollectStarRatings from "./collect-start-rating";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import feedbackSchema from "@/schemas/feedbackSchema";
import { submitTextFeedback } from "@/actions/feedbackActions";
import { FeedbackType } from "@/lib/db";

export default function WriteTextDialog({ space }: { space: any }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 3,
      permission: false,
      answer: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    if (Object.keys(errors).length === 0) {
      startTransition(() => {
        submitTextFeedback(space.id, data, FeedbackType.TEXT)
          .then((res) => {
            if (res.error) {
              console.error(res.error);
              return;
            }
            console.log(res.message);
          })
          .finally(() => {
            setOpen(false);
            reset();
          });
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-full sm:max-w-40 group flex gap-1"
          variant={"secondary"}
        >
          <Pen
            className="me-1 transition-transform group-hover:-translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <h2>Write as text</h2>
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write text testimonial to</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <h2 className="font-bold text-muted-foreground">Questions</h2>
        <ul className="list-disc list-inside">
          {space.questions.map((question: any) => (
            <li key={question.id} className="text-muted-foreground">
              {question.title}
            </li>
          ))}
        </ul>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            handleSubmit(onSubmit)();
            e.preventDefault();
          }}
        >
          <Controller
            name="answer"
            control={control}
            render={({ field }) => (
              <>
                <Textarea placeholder="Write your answer here" {...field} />
                {errors.answer && (
                  <p className="text-destructive text-xs">
                    {errors.answer.message}
                  </p>
                )}
              </>
            )}
          />
          <Label htmlFor="name">Your name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input placeholder="Tommy Shelby" {...field} required />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </>
            )}
          />
          <Label htmlFor="email">Your email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input placeholder="tommy@gmail.com" {...field} required />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    {errors.email.message}
                  </p>
                )}
              </>
            )}
          />
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <>
                <CollectStarRatings field={field} />
                {errors.rating && (
                  <p className="text-destructive text-xs">
                    {errors.rating.message}
                  </p>
                )}
              </>
            )}
          />
          <div className="flex gap-2">
            <Controller
              name="permission"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="permission">
                      I give permission to use this testimonial across social
                      channels and other marketing efforts
                    </Label>
                  </div>
                  <p>
                    {errors.permission && (
                      <span className="text-destructive text-xs">
                        {errors.permission.message}
                      </span>
                    )}
                  </p>
                </div>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              className="mt-4 w-full sm:w-24"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
