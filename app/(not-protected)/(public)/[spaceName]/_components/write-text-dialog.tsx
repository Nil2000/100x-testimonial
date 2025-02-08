import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import React from "react";
import CollectStarRatings from "./collect-start-rating";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import feedbackSchema from "@/schemas/feedbackSchema";

export default function WriteTextDialog({ space }: { space: any }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
    console.log(data);
  };

  return (
    <Dialog>
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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                <>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="permission">
                    I give permission to use this testimonial across social
                    channels and other marketing efforts
                  </Label>
                </>
              )}
            />
          </div>
          <Button className="w-full mt-4" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
