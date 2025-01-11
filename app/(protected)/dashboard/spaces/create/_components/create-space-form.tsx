import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function CreateSpaceForm() {
  return (
    <div className="space-y-2 pr-8 mt-2">
      <Label htmlFor="">
        Space name <span className="text-destructive">*</span>
      </Label>
      <Input placeholder="Space name" />
      <Label htmlFor="">
        Space logo <span className="text-destructive">*</span>
      </Label>
      <Input
        id={"file"}
        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        type="file"
      />
      <Label htmlFor="">
        Header title <span className="text-destructive">*</span>
      </Label>
      <Input placeholder="Would you like to give a shoutout for xyz?" />
      <Label htmlFor="">
        Your custom message <span className="text-destructive">*</span>
      </Label>
      <Textarea placeholder="Leave a message" required />
    </div>
  );
}
