import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pen } from "lucide-react";
import React from "react";

export default function WriteTextDialog({ space }: { space: any }) {
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
      <DialogContent>
        <DialogTitle>
          <h2>Write as text</h2>
        </DialogTitle>
      </DialogContent>
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Write text testimonial to</DialogTitle>
          <DialogDescription>
            Questions
            {space.questions.map((question: any) => (
              <li key={question.id} className="text-muted-foreground">
                {question.title}
              </li>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
