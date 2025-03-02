import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepType } from "@/lib/constants";
import { DialogTitle } from "@radix-ui/react-dialog";
import { RiBankCardLine } from "@remixicon/react";
import { ArrowRightIcon, FileVideo, FileVideo2, Video } from "lucide-react";
import React from "react";

type Props = {
  setStep: (step: StepType) => void;
};

export default function ChooseMethodOptionsDialogContent({ setStep }: Props) {
  const [method, setMethod] = React.useState("record-video");
  return (
    <div className="flex flex-col gap-4 py-6">
      <DialogHeader className="w-full flex items-center">
        <DialogTitle className="font-medium text-xl">
          {" "}
          Choose a method
        </DialogTitle>
      </DialogHeader>
      <div className="flex items-center ">
        <Button
          className="w-max h-max"
          defaultValue="record-video"
          onClick={() => {
            setStep("check-permission");
          }}
        >
          <Video className="opacity-60" size={24} aria-hidden="true" />
          Record Video
        </Button>
        <Button>
          <FileVideo className="opacity-60" size={24} aria-hidden="true" />
          Upload Video
        </Button>
      </div>
      {/* <div className="w-full flex justify-center">
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
      </div> */}
    </div>
  );
}
