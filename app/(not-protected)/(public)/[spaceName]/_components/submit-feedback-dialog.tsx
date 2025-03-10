import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { videoJSOptions } from "@/lib/constants";
import { Loader2, Video } from "lucide-react";
import React, { useState, useTransition } from "react";
import VideoCustomComponent from "./videojs-component";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import videoFeedbackSchema, {
  VideoFeedback,
} from "@/schemas/videoFeedbackSchema";
import { uploadFileToBucket } from "@/actions/fileAction";
import cuid2, { createId } from "@paralleldrive/cuid2";
import { submitVideoFeedback } from "@/actions/feedbackActions";
import { Input } from "@/components/ui/input";
import CollectStarVideoRatings from "./collect-star-video";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  open: boolean;
  onClose: () => void;
  videoFileBlob: Blob | null;
  retakeVideo: () => void;
  spaceName: string;
  spaceId: string;
  showThankYou: () => void;
};

export default function SubmitFeedbackDialog({
  open,
  onClose,
  videoFileBlob,
  retakeVideo,
  spaceName,
  spaceId,
  showThankYou,
}: Props) {
  const playerRef = React.useRef<HTMLVideoElement>(null);
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VideoFeedback>({
    resolver: zodResolver(videoFeedbackSchema),
    defaultValues: {
      videoUrl: "http://localhost:3000/logo.svg",
      name: "nil",
      email: "abc@gmail.com",
      rating: 3,
      permission: false,
    },
  });

  const options = videoFileBlob && {
    ...videoJSOptions,
    sources: [
      {
        src: URL.createObjectURL(videoFileBlob!),
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  const uploadFile = async (file: File, spaceName: string) => {
    if (!file) return;
    console.log(file);
    const url = await uploadFileToBucket({
      file: file,
      key: `space/${spaceName}/feedback/${createId() + createId()}.${
        file.type.split("/")[1]
      }`,
      mimeType: file.type,
      size: file.size,
    });
    return url;
  };

  const onSubmit = async (data: VideoFeedback) => {
    if (Object.keys(errors).length === 0) {
      console.log(data);
      startTransition(() => {
        if (!videoFileBlob) {
          console.error("No video file found");
          return;
        }
        const file = new File(
          [videoFileBlob!],
          `${createId()}feedback-video.mp4`,
          { type: "video/mp4" }
        );
        uploadFile(file, spaceName)
          .then((res) => {
            console.log(res);
            if (res && res.error) {
              console.error(res.error);
              return;
            }
            data.videoUrl = res?.url!;
            submitVideoFeedback(spaceId, data)
              .then((res) => {
                if (res.error) {
                  console.error(res.error);
                  return;
                }
                console.log(res.message);
              })
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            onClose();
            reset();
            showThankYou();
          });
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          onClose();
          reset();
        }
      }}
    >
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader className="flex flex-col items-center gap-y-3">
          <div className="bg-primary/10 text-primary-background rounded-full p-3">
            <Video size={24} />
          </div>
          <DialogTitle>Review your video</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center ">
          <VideoCustomComponent options={options} onReady={handlePlayerReady} />
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(onSubmit)();
            e.preventDefault();
          }}
          className="w-full"
        >
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Your Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Input placeholder="Name" {...field} required />
                  {errors.name && (
                    <p className="text-destructive text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </>
              )}
            />
            <Label htmlFor="email">Your Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input type="email" placeholder="Email" {...field} required />
                  {errors.email && (
                    <p className="text-destructive text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </>
              )}
            />
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <>
                  <CollectStarVideoRatings field={field} />
                  {errors.rating && (
                    <p className="text-destructive text-xs">
                      {errors.rating.message}
                    </p>
                  )}
                </>
              )}
            />
            {errors.rating && <span>{errors.rating.message}</span>}
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
          </div>
          {errors.videoUrl && (
            <p className="text-destructive text-xs">
              {errors.videoUrl.message}
            </p>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                onClose();
                retakeVideo();
              }}
              variant={"secondary"}
              className="w-full sm:w-24 me-2"
            >
              Retake
            </Button>
            <Button className="w-full sm:w-24 me-2" type="submit">
              {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
