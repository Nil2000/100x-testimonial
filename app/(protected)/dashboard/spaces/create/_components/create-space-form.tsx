"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, XCircle } from "lucide-react";
import React from "react";
import QuestionItem from "./question-item";
import DragAndDropQuestions from "./drag-and-drop-questions";
import { useForm, Controller } from "react-hook-form";

const dropDownItems = [
  { id: 1, name: "Text only" },
  { id: 2, name: "Video only" },
  { id: 3, name: "Text and Video both" },
];

export default function CreateSpaceForm({
  setFileSelected,
  isFileSelected,
}: {
  setFileSelected: React.Dispatch<React.SetStateAction<File | null>>;
  isFileSelected: File | null;
}) {
  const { control, handleSubmit, setValue } = useForm();
  const [questions, setQuestions] = React.useState<
    { id: string; question: string; maxLength: number }[]
  >([
    {
      id: "1",
      question: "Who are you / what are you working on?",
      maxLength: 50,
    },
    {
      id: "2",
      question: "What is the best thing about [our product / service]",
      maxLength: 50,
    },
    {
      id: "3",
      question: "How has [our product / service] helped you?",
      maxLength: 50,
    },
  ]);
  const [checked, setChecked] = React.useState<boolean>(true);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const handleNewQuestion = () => {
    const question = {
      id: (questions.length + 1).toString(),
      question: "",
      maxLength: 50,
    };
    setQuestions((prev) => [...prev, question]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pr-8 mt-2">
      <div className="space-y-2">
        <Label htmlFor="spaceName">
          Space name <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="spaceName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input placeholder="Space name" {...field} />}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="spaceLogo">
          Space logo <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="spaceLogo"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="file"
                className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.files && e.target.files[0]) {
                    setFileSelected(e.target.files[0]);
                  }
                }}
                // {...field}
              />
              {isFileSelected && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setFileSelected(null);
                    // field.onChange(null);
                    setValue("spaceLogo", null);
                    const node = document.getElementById(
                      "file"
                    ) as HTMLInputElement;
                    if (node) node.value = "";
                  }}
                  className="text-muted-foreground hover:text-red-500 "
                >
                  <XCircle size={16} className="-ms-1 me-2 opacity-60" />
                  Remove
                </Button>
              )}
            </>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="headerTitle">
          Header title <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="headerTitle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              placeholder="Would you like to give a shoutout for xyz?"
              {...field}
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customMessage">
          Your custom message <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="customMessage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea placeholder="Leave a message" required {...field} />
          )}
        />
      </div>
      <div className="h-max space-y-2">
        <Label htmlFor="">Questions</Label>
        <DragAndDropQuestions items={questions} setItems={setQuestions} />
        <Button
          variant={"outline"}
          onClick={handleNewQuestion}
          type="button"
          className="text-muted-foreground"
        >
          <PlusCircle size={16} className="-ms-1 me-2 opacity-60" />
          Add one more
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="options">Collection type</Label>
        <Controller
          name="collectionType"
          control={control}
          defaultValue={dropDownItems[0].name}
          render={({ field }) => (
            <Select {...field}>
              <SelectTrigger name="options" className="w-full md:w-56">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="font-sans">
                {dropDownItems.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-x-2 grid grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="collectStarRatings">Collect star ratings</Label>
          <Controller
            name="collectStarRatings"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch className="rounded-md [&_span]:rounded" {...field} />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="chooseTheme">Choose theme</Label>
          <Controller
            name="chooseTheme"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch className="rounded-md [&_span]:rounded" {...field} />
            )}
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
