import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React from "react";

type Props = {
  handleDelete: () => void;
};

export default function DeleteSpaceDialog({ handleDelete }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-min" variant={"destructive"}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete Space
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Delete Space</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this space? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
