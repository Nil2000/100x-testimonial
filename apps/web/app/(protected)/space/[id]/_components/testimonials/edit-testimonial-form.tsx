"use client";
import { useSpaceStore } from "@/store/spaceStore";
import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { spaceSchema } from "@/schemas/spaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DragAndDropQuestions from "@/components/drag-and-drop-questions";
import { Loader2, PlusCircle, XCircle } from "lucide-react";
import { dropDownOptionsTextVideo } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { updateSpace } from "@/actions/spaceActions";
import { uploadFileToBucket } from "@/actions/fileAction";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </h3>
  );
}

export default function TestimonialEditFormView() {
  const { spaceInfo, updateSpaceField } = useSpaceStore();
  const [isPending, startTransition] = useTransition();
  const [fileSelected, setFileSelected] = React.useState<File | null>(null);
  const initialLogoRef = React.useRef<string | null>(spaceInfo.logo || null);
  const objectUrlRef = React.useRef<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      spaceName: spaceInfo.name,
      headerTitle: spaceInfo.headerTitle,
      customMessage: spaceInfo.headerSubtitle,
      questionList: spaceInfo.questions,
      collectionType: spaceInfo.collectionType,
      collectStarRating: spaceInfo.collectStar,
      logo: spaceInfo.logo || "",
    },
  });

  // Object URLs for the live logo preview leak unless we hand them back.
  const setLogoPreview = React.useCallback(
    (file: File | null) => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      if (!file) {
        updateSpaceField("logo", initialLogoRef.current || "");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      objectUrlRef.current = previewUrl;
      updateSpaceField("logo", previewUrl);
    },
    [updateSpaceField],
  );

  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleQuestionsSequenceChange = (
    items: { id: string; title: string; maxLength: number }[],
  ) => {
    setValue("questionList", items, { shouldDirty: true });
    updateSpaceField("questions", items);
  };

  const handleNewQuestion = () => {
    const newQuestion = {
      id: createId(),
      title: "",
      maxLength: 100,
    };
    handleQuestionsSequenceChange([...spaceInfo.questions, newQuestion]);
  };

  const uploadFile = async (file: File, spaceName: string) => {
    return uploadFileToBucket({
      file: file,
      key: `space/${spaceName}/space-logo/${createId() + createId()}.${
        file.type.split("/")[1]
      }`,
      mimeType: file.type,
      size: file.size,
      validation: {
        type: "space-owner-by-name",
        spaceName,
      },
    });
  };

  const onSubmit = async (data: z.infer<typeof spaceSchema>) => {
    if (!fileSelected) {
      // undefined (not "") so Prisma leaves an existing logo untouched and
      // spaces without one can still be saved.
      data.logo = initialLogoRef.current || undefined;
    } else {
      try {
        const fileUrl = await uploadFile(fileSelected, spaceInfo.name);
        if (!fileUrl) {
          toast.error("Failed to upload logo. Please try again.");
          return;
        }
        data.logo = fileUrl.url;
        toast.success("Logo uploaded successfully!");
      } catch (error) {
        console.error("Logo upload failed:", error);
        toast.error("Failed to upload logo. Please try again.");
        return;
      }
    }

    startTransition(() => {
      updateSpace(spaceInfo.id, data).then((res) => {
        if (res.error) {
          console.error(res.error);
          toast.error("Failed to update space. Please try again.");
        } else {
          toast.success("Space updated successfully!");
        }
      });
    });
  };

  const onInvalid = () => {
    toast.error("Please fix the highlighted fields before saving.");
  };

  const questionListError = errors.questionList
    ? (errors.questionList.message ?? "Every question needs a title.")
    : undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="w-full space-y-8"
    >
      <section className="space-y-4">
        <SectionHeading>Page content</SectionHeading>

        <div className="space-y-2">
          <Label htmlFor="spaceName">Space name</Label>
          <Controller
            name="spaceName"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="spaceName"
                  placeholder="Space name"
                  {...field}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  The name is fixed after creation. Your public page lives at{" "}
                  <span className="font-mono">
                    {process.env.NEXT_PUBLIC_BASE_URL}/
                    {field.value || "your-space-name"}
                  </span>
                </p>
                <FieldError message={errors.spaceName?.message} />
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="spaceLogo">Space logo</Label>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex items-center gap-2">
                  <Input
                    id="spaceLogo"
                    className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e);
                      const file = e.target.files?.[0] ?? null;
                      setFileSelected(file);
                      setLogoPreview(file);
                    }}
                  />
                  {fileSelected && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFileSelected(null);
                        setLogoPreview(null);
                        setValue("logo", initialLogoRef.current || "");
                        const node = document.getElementById(
                          "spaceLogo",
                        ) as HTMLInputElement | null;
                        if (node) node.value = "";
                      }}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <XCircle size={16} className="-ms-1 me-2 opacity-60" />
                      Remove
                    </Button>
                  )}
                </div>
                <FieldError message={errors.logo?.message} />
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="headerTitle">Header title</Label>
          <Controller
            name="headerTitle"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="headerTitle"
                  placeholder="Would you like to give a shoutout for xyz?"
                  onChange={(e) => {
                    field.onChange(e);
                    updateSpaceField("headerTitle", e.target.value);
                  }}
                  defaultValue={spaceInfo.headerTitle}
                />
                <FieldError message={errors.headerTitle?.message} />
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customMessage">Your custom message</Label>
          <Controller
            name="customMessage"
            control={control}
            render={({ field }) => (
              <>
                <Textarea
                  id="customMessage"
                  placeholder="Leave a message"
                  onChange={(e) => {
                    field.onChange(e);
                    updateSpaceField("headerSubtitle", e.target.value);
                  }}
                  defaultValue={spaceInfo.headerSubtitle}
                />
                <FieldError message={errors.customMessage?.message} />
              </>
            )}
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading>Questions</SectionHeading>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewQuestion}
            type="button"
            className="text-muted-foreground"
          >
            <PlusCircle size={14} className="-ms-1 me-2 opacity-60" />
            Add question
          </Button>
        </div>
        <DragAndDropQuestions
          items={spaceInfo.questions}
          setItems={handleQuestionsSequenceChange}
        />
        <FieldError message={questionListError} />
        {spaceInfo.questions.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Drag the handle to reorder.
          </p>
        )}
      </section>

      <Separator />

      <section className="space-y-1">
        <SectionHeading>Collection</SectionHeading>
        <div className="divide-y">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0 space-y-0.5">
              <Label htmlFor="collectionType">Collection type</Label>
              <p className="text-sm text-muted-foreground">
                What visitors are allowed to submit.
              </p>
            </div>
            <Controller
              name="collectionType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    updateSpaceField("collectionType", e);
                  }}
                  value={field.value}
                >
                  <SelectTrigger
                    id="collectionType"
                    className="w-44 shrink-0 bg-background"
                  >
                    <SelectValue placeholder="Select style" />
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

          <div className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0 space-y-0.5">
              <Label htmlFor="collectStarRating">Collect star ratings</Label>
              <p className="text-sm text-muted-foreground">
                Ask for a 1–5 star score alongside the testimonial.
              </p>
            </div>
            <Controller
              name="collectStarRating"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  id="collectStarRating"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    updateSpaceField("collectStar", checked);
                  }}
                />
              )}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3 border-t py-3">
        <Button
          type="submit"
          className="w-full sm:max-w-[300px]"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Update space"
          )}
        </Button>
        {isDirty && !isPending && (
          <span className="text-xs text-muted-foreground">Unsaved changes</span>
        )}
      </div>
    </form>
  );
}
