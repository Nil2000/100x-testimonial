"use client";
import { Button } from "@/components/ui/button";
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
import { Loader2, PlusCircle, Sparkles, XCircle } from "lucide-react";
import React, { useTransition } from "react";
import DragAndDropQuestions from "../../../../../../components/drag-and-drop-questions";
import { useForm, Controller } from "react-hook-form";
import { dropDownOptionsTextVideo, sampleQuestions } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { spaceSchema } from "@/schemas/spaceSchema";
import { CollectionType } from "@/generated/prisma/enums";
import { z } from "zod";
import { createSpace } from "@/actions/spaceActions";
import { CreateSpaceQuestion } from "@/lib/types";
import { uploadFileToBucket } from "@/actions/fileAction";
import { createId } from "@paralleldrive/cuid2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateSpaceForm({
  setFileSelected,
  isFileSelected,
  setHeaderTitlePreview,
  setCustomMessagePreview,
  setQuestionsPreview,
  setCollectionTypePreview,
}: {
  setFileSelected: React.Dispatch<React.SetStateAction<File | null>>;
  isFileSelected: File | null;
  setHeaderTitlePreview: React.Dispatch<React.SetStateAction<string>>;
  setCustomMessagePreview: React.Dispatch<React.SetStateAction<string>>;
  setQuestionsPreview: React.Dispatch<
    React.SetStateAction<CreateSpaceQuestion[]>
  >;
  setCollectionTypePreview: React.Dispatch<
    React.SetStateAction<CollectionType>
  >;
}) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      spaceName: "",
      headerTitle: "",
      customMessage: "",
      questionList: sampleQuestions,
      collectionType: CollectionType.TEXT,
      collectStarRating: false,
      // chooseTheme: false,
      logo: "",
    },
  });
  const [questions, setQuestions] =
    React.useState<CreateSpaceQuestion[]>(sampleQuestions);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleNewQuestion = () => {
    const question = {
      id: Math.random().toString(36),
      title: "",
      maxLength: 50,
    };
    setQuestions((prev) => [...prev, question]);
    setQuestionsPreview((prev) => [...prev, question]);
  };

  const handleQuestionsSequenceChange = (items: CreateSpaceQuestion[]) => {
    setQuestions(items);
    setQuestionsPreview(items);
    setValue("questionList", items);
  };

  const uploadFile = async (file: File, spaceName: string) => {
    console.log(file);
    try {
      if (!file) {
        throw new Error("No file selected");
      }
      const url = await uploadFileToBucket({
        file: file,
        key: `space/${spaceName}/space-logo/${createId() + createId()}.${
          file.type.split("/")[1]
        }`,
        mimeType: file.type,
        size: file.size,
      });
      return url;
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = (data: z.infer<typeof spaceSchema>) => {
    console.log(data);
    if (isFileSelected) {
      console.log("file selected", isFileSelected);
      uploadFile(isFileSelected, data.spaceName)
        .then((msg: { error?: unknown; url?: string }) => {
          if (msg.error) {
            throw new Error(String(msg.error));
          }
          console.log(msg);
          data.logo = msg.url;
          toast.success("Logo uploaded successfully!");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to upload logo. Please try again.");
        });
    }
    startTransition(() => {
      createSpace(data)
        .then((res) => {
          if (res.error) {
            throw new Error(String(res.error));
          }
          console.log(res.message);
          toast.success("Space created successfully!");
          //redirect to the newly created space
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create space. Please try again.");
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info Section */}
      <div className="space-y-4 p-5 rounded-xl border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h3 className="font-semibold">Basic Information</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="spaceName">
            Space name <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="spaceName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="space-y-1.5">
                <Input placeholder="My Awesome Product" {...field} />
                <p className="text-xs text-muted-foreground">
                  Public URL:{" "}
                  <span className="font-mono text-foreground/70">
                    testimonial.to/{field.value || "your-space-name"}
                  </span>
                </p>
                {errors.spaceName && (
                  <p className="text-destructive text-xs">
                    {errors.spaceName.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="spaceLogoUrl">Space logo</Label>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Input
                    id="file"
                    className="flex-1 p-0 pe-3 file:me-3 file:border-0 file:border-e file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.files && e.target.files[0]) {
                        setFileSelected(e.target.files[0]);
                      }
                    }}
                  />
                  {isFileSelected && (
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => {
                        setFileSelected(null);
                        setValue("logo", "");
                        const node = document.getElementById(
                          "file"
                        ) as HTMLInputElement;
                        if (node) node.value = "";
                      }}
                      className="text-muted-foreground hover:text-destructive gap-1.5"
                    >
                      <XCircle size={14} />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 p-5 rounded-xl border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h3 className="font-semibold">Page Content</h3>
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
              <div className="space-y-1.5">
                <Input
                  placeholder="Would you like to give a shoutout for xyz?"
                  onChange={(e) => {
                    field.onChange(e);
                    setHeaderTitlePreview(e.target.value);
                  }}
                />
                {errors.headerTitle && (
                  <p className="text-destructive text-xs">
                    {errors.headerTitle.message}
                  </p>
                )}
              </div>
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
              <div className="space-y-1.5">
                <Textarea
                  placeholder="Tell your customers what kind of feedback you're looking for..."
                  className="min-h-[100px] resize-none"
                  onChange={(e) => {
                    field.onChange(e);
                    setCustomMessagePreview(e.target.value);
                  }}
                />
                {errors.customMessage && (
                  <p className="text-destructive text-xs">
                    {errors.customMessage.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4 p-5 rounded-xl border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 rounded-full bg-primary" />
            <h3 className="font-semibold">Questions</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewQuestion}
            type="button"
            className="gap-1.5"
          >
            <PlusCircle size={14} />
            Add Question
          </Button>
        </div>

        <DragAndDropQuestions
          items={questions}
          setItems={handleQuestionsSequenceChange}
        />
        <p className="text-xs text-muted-foreground">
          Drag to reorder questions. Click to edit.
        </p>
      </div>

      {/* Settings Section */}
      <div className="space-y-4 p-5 rounded-xl border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h3 className="font-semibold">Settings</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="options">Collection type</Label>
            <Controller
              name="collectionType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setCollectionTypePreview(e as CollectionType);
                  }}
                  value={field.value}
                >
                  <SelectTrigger name="options" className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="font-sans">
                    {dropDownOptionsTextVideo.map((item) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <div className="space-y-0.5">
              <Label htmlFor="collectStarRatings" className="cursor-pointer">
                Collect star ratings
              </Label>
              <p className="text-xs text-muted-foreground">
                Allow users to rate with stars
              </p>
            </div>
            <Controller
              name="collectStarRating"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  id="collectStarRatings"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          size="lg"
          className="gap-2 min-w-[180px]"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Create Space
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
