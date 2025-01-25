import { useSpaceStore } from "@/store/spaceStore";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { z } from "zod";
import { spaceSchema } from "@/schema/spaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function TestimonialEditFormView() {
  const { spaceInfo } = useSpaceStore();
  console.log("Space Info", spaceInfo);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      spaceName: spaceInfo.spaceName,
      headerTitle: spaceInfo.headerTitle,
      customMessage: spaceInfo.headerSubtitle,
      questionList: spaceInfo.questions,
      collectionType: spaceInfo.collectionType,
      collectStarRating: spaceInfo.collectStarRating,
    },
  });

  const onSubmit = (data: z.infer<typeof spaceSchema>) => {
    console.log(data);
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
          render={({ field }) => (
            <>
              <Input placeholder="Space name" {...field} />
              <h1 className="text-muted-foreground text-sm">
                Public url will be testimonial.to/
                {field.value || "your-space-name"}
              </h1>
              <p className="text-destructive text-xs">
                {errors.spaceName && errors.spaceName.message}
              </p>
            </>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="spaceLogoUrl">
          Space logo <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="spaceLogoUrl"
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
                    setValue("spaceLogoUrl", "");
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
            <>
              <Input
                placeholder="Would you like to give a shoutout for xyz?"
                onChange={(e) => {
                  field.onChange(e);
                  setHeaderTitlePreview(e.target.value);
                }}
                // {...field}
              />
              <p className="text-destructive text-xs">
                {errors.headerTitle && errors.headerTitle.message}
              </p>
            </>
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
            <>
              <Textarea
                placeholder="Leave a message"
                required
                onChange={(e) => {
                  field.onChange(e);
                  setCustomMessagePreview(e.target.value);
                }}
              />
              <p className="text-destructive text-xs">
                {errors.customMessage && errors.customMessage.message}
              </p>
            </>
          )}
        />
      </div>
      <div className="h-max space-y-2">
        <Label htmlFor="">Questions</Label>
        <DragAndDropQuestions
          items={questions}
          setItems={handleQuestionsSequenceChange}
        />
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
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger name="options" className="w-full md:w-56">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="font-sans">
                {dropDownItems.map((item) => (
                  <SelectItem key={item.id} value={item.value}>
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
            name="collectStarRating"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch
                className="rounded-md [&_span]:rounded"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        {/* <div className="flex flex-col gap-y-2">
          <Label htmlFor="chooseTheme">Choose theme</Label>
          <Controller
            name="chooseTheme"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch className="rounded-md [&_span]:rounded" {...field} />
            )}
          />
        </div> */}
      </div>
      <Button type="submit" className="my-4" disabled={isPending}>
        Create new space
      </Button>
    </form>
  );
}
