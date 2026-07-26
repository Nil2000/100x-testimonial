import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
type ThankYouDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  message?: string;
};

export default function ThankYouDialog({
  open,
  onOpenChange,
  title,
  message,
}: ThankYouDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto flex flex-col items-center">
        <Image
          src={
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmJ4eWVzeDU5dHJvMjF2ZWlmdDZidDV1dmRpNXVkanJkZjl3bGNqZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g9582DNuQppxC/giphy.gif"
          }
          alt="Thank you"
          width={300}
          height={300}
        />
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
