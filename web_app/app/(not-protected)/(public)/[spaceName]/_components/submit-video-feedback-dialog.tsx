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
import { Loader2, Video, XCircle } from "lucide-react";
import React, { useTransition } from "react";
import VideoCustomComponent from "@/components/videojs-component";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import videoFeedbackSchema, {
  VideoFeedback,
} from "@/schemas/videoFeedbackSchema";
import { uploadFileToBucket } from "@/actions/fileAction";
import { createId } from "@paralleldrive/cuid2";
import { submitVideoFeedback } from "@/actions/feedbackActions";
import { Input } from "@/components/ui/input";
import CollectStarVideoRatings from "./collect-star-video";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  open: boolean;
  onClose: () => void;
  videoFileBlob: Blob | null;
  retakeVideo: () => void;
  spaceName: string;
  spaceId: string;
  showThankYou: () => void;
};

export default function SubmitVideoFeedbackDialog({
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
  const [profilePicFile, setProfilePicFile] = React.useState<File | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<VideoFeedback>({
    resolver: zodResolver(videoFeedbackSchema),
    defaultValues: {
      videoUrl: "http://localhost:3000/logo.svg",
      name: "",
      email: "",
      rating: 3,
      permission: false,
      imageUrl: "",
      profileImageUrl: "",
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

  const uploadFile = async (
    file: File,
    spaceName: string,
    catgeory: string
  ) => {
    if (!file) return;
    const url = await uploadFileToBucket({
      file: file,
      key: `space/${spaceName}/${catgeory}/${createId() + createId()}.${
        file.type.split("/")[1]
      }`,
      mimeType: file.type,
      size: file.size,
    });
    return url;
  };

  const onSubmit = async (data: VideoFeedback) => {
    startTransition(async () => {
      try {
        if (!profilePicFile) {
          data.profileImageUrl = "";
        } else {
          const fileUrl = await uploadFile(
            profilePicFile,
            spaceName,
            "profilePicUrl"
          );
          if (!fileUrl) {
            console.error("File upload failed");
            return;
          }
          data.profileImageUrl = fileUrl.url;
        }

        if (Object.keys(errors).length === 0) {
          if (!videoFileBlob) {
            console.error("No video file found");
            return;
          }

          const file = new File(
            [videoFileBlob!],
            `${createId()}feedback-video.mp4`,
            {
              type: "video/mp4",
            }
          );

          const videoRes = await uploadFile(file, spaceName, "feedbackVideo");
          if (videoRes?.error) {
            console.error(videoRes.error);
            return;
          }

          data.videoUrl = videoRes?.url!;
          const feedbackRes = await submitVideoFeedback(spaceId, data);

          if (feedbackRes.error) {
            console.error(feedbackRes.error);
            return;
          }

          console.log(feedbackRes.message);
          onClose();
          reset();
          showThankYou();
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onClose();
        if (isOpen) {
          reset();
          setProfilePicFile(null);
          const node = document.getElementById("file") as HTMLInputElement;
          if (node) {
            node.value = "";
          }
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
        <div className="flex flex-col items-center">
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
                        setProfilePicFile(e.target.files[0]);
                      }
                    }}
                  />
                  {profilePicFile && (
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={
                          profilePicFile
                            ? URL.createObjectURL(profilePicFile)
                            : ""
                        }
                        alt="public_user_image"
                        className="object-cover"
                      />
                    </Avatar>
                  )}
                  {profilePicFile && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProfilePicFile(null);
                        setValue("profileImageUrl", "");
                        const node = document.getElementById(
                          "file"
                        ) as HTMLInputElement;
                        if (node) node.value = "";
                      }}
                      className="text-muted-foreground hover:text-red-500 w-min"
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
          <DialogFooter className="pt-4">
            <Button
              onClick={() => {
                onClose();
                reset();
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
