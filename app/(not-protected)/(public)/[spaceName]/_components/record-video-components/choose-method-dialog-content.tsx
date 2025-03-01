import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogTitle } from "@radix-ui/react-dialog";
import { RiBankCardLine } from "@remixicon/react";
import { ArrowRightIcon, FileVideo, FileVideo2, Video } from "lucide-react";
import React from "react";

export default function ChooseMethodOptionsDialogContent() {
  const [method, setMethod] = React.useState("record-video");
  return (
    <div className="flex flex-col gap-4 py-6">
      <DialogHeader className="w-full flex items-center">
        <DialogTitle className="font-medium text-xl">
          {" "}
          Choose a method
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center">
        <RadioGroup
          className="grid-cols-2 gap-3"
          defaultValue="record-video"
          onValueChange={(value) => setMethod(value)}
        >
          <div className="relative">
            <RadioGroupItem
              id={`record-video`}
              value="record-video"
              className="sr-only"
            />
            <Label
              htmlFor={`record-video`}
              className={`border-input relative flex flex-col gap-4 rounded-md border p-4 shadow-xs
             hover:border-ring hover:bg-white/10 items-center 
            ${
              method === "record-video"
                ? "border-ring ring-1 ring-white/50"
                : ""
            }`}
            >
              <Video className="opacity-60" size={24} aria-hidden="true" />
              Record Video
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem
              id={`upload-video`}
              value="upload-video"
              className="sr-only"
            />
            <Label
              htmlFor={`upload-video`}
              className={`border-input relative flex flex-col gap-4 rounded-md border p-4 shadow-xs
             hover:border-ring hover:bg-white/10 items-center 
             ${
               method === "upload-video"
                 ? "border-ring ring-1 ring-white/50"
                 : ""
             }`}
            >
              <FileVideo className="opacity-60" size={24} aria-hidden="true" />
              Upload Video
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="w-full flex justify-center">
        <DialogFooter className="w-full flex gap-4 sm:justify-center">
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button className="group gap-2" type="button">
            Next
            <ArrowRightIcon
              className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DialogFooter>
      </div>
    </div>
  );
}
