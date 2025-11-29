import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, XCircle } from "lucide-react";
import React, { useTransition } from "react";
import CollectStarRatings from "./collect-start-rating";
import { Controller, useForm } from "react-hook-form";
import { Feedback } from "@/schemas/feedbackSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import feedbackSchema from "@/schemas/feedbackSchema";
import { submitTextFeedback } from "@/actions/feedbackActions";
import { FeedbackType } from "@/lib/db";
import { uploadFileToBucket } from "@/actions/fileAction";
import { createId } from "@paralleldrive/cuid2";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  space: any;
  showThankYou: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SubmitTextFeedbackDialog({
  space,
  showThankYou,
  open,
  onOpenChange,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isFileSelected, setFileSelected] = React.useState<File | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Feedback>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 3,
      permission: false,
      answer: "",
      name: "",
      email: "",
      imageUrl: "",
      profileImageUrl: "",
    },
  });

  const uploadFile = async (file: File, spaceName: string) => {
    if (!file) return;
    console.log(file);
    const url = await uploadFileToBucket({
      file: file,
      key: `space/${spaceName}/profilePicUrl/${createId() + createId()}.${
        file.type.split("/")[1]
      }`,
      mimeType: file.type,
      size: file.size,
    });
    return url;
  };

  const onSubmit = async (data: any) => {
    if (!isFileSelected) {
      data.profileImageUrl = "";
    } else {
      const fileUrl = await uploadFile(isFileSelected, space.name);
      if (!fileUrl) {
        console.error("File upload failed");
        return;
      }
      data.profileImageUrl = fileUrl.url;
    }
    // Clear imageUrl as it's not used for profile images
    data.imageUrl = "";

    if (Object.keys(errors).length === 0) {
      startTransition(() => {
        submitTextFeedback(space.id, data, FeedbackType.TEXT)
          .then((res) => {
            if (res.error) {
              console.error(res.error);
              return;
            }
            console.log(res.message);
          })
          .finally(() => {
            onOpenChange(false);
            reset();
            setFileSelected(null);
            const node = document.getElementById("file") as HTMLInputElement;
            if (node) {
              node.value = "";
            }
            showThankYou();
          });
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        reset();
        setFileSelected(null);
        const node = document.getElementById("file") as HTMLInputElement;
        if (node) {
          node.value = "";
        }
      }}
    >
      {/* <DialogTrigger asChild>
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
      </DialogTrigger> */}
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write text testimonial to</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <h2 className="font-bold text-muted-foreground">Questions</h2>
        <ul className="list-disc list-inside">
          {space.questions.map((question: any) => (
            <li key={question.id} className="text-muted-foreground">
              {question.title}
            </li>
          ))}
        </ul>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            handleSubmit(onSubmit)();
            e.preventDefault();
          }}
        >
          <Controller
            name="answer"
            control={control}
            render={({ field }) => (
              <>
                <Textarea placeholder="Write your answer here" {...field} />
                {errors.answer && (
                  <p className="text-destructive text-xs">
                    {errors.answer.message}
                  </p>
                )}
              </>
            )}
          />
          <Label htmlFor="name">Your name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input placeholder="Tommy Shelby" {...field} />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </>
            )}
          />
          <Label htmlFor="email">Your email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input placeholder="tommy@gmail.com" {...field} />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    {errors.email.message}
                  </p>
                )}
              </>
            )}
          />

          <Label htmlFor="profileImageUrl">Your profile picture</Label>
          <Controller
            name="profileImageUrl"
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
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={
                        isFileSelected
                          ? URL.createObjectURL(isFileSelected)
                          : ""
                      }
                      alt="public_user_image"
                      className="object-cover"
                    />
                  </Avatar>
                )}
                {isFileSelected && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFileSelected(null);
                      setValue("imageUrl", "");
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

          {errors.profileImageUrl && (
            <p className="text-destructive text-xs">
              {errors.profileImageUrl.message}
            </p>
          )}

          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <>
                <CollectStarRatings field={field} />
                {errors.rating && (
                  <p className="text-destructive text-xs">
                    {errors.rating.message}
                  </p>
                )}
              </>
            )}
          />
          <div className="flex gap-2">
            <Controller
              name="permission"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="permission">
                      I give permission to use this testimonial across social
                      channels and other marketing efforts
                    </Label>
                  </div>
                  <p>
                    {errors.permission && (
                      <span className="text-destructive text-xs">
                        {errors.permission.message}
                      </span>
                    )}
                  </p>
                </div>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              className="mt-4 w-full sm:w-24"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
