import Loading from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

export default function RecordVideoPermissions() {
  const [permissionEnabled, setPermissionEnabled] = React.useState(false);
  const [checkingPermission, setCheckingPermission] = React.useState(true);

  const checkPermission = () => {
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (error) {
      setPermissionEnabled(false);
    }
  };

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        setPermissionEnabled(true);
      })
      .catch(() => {
        setPermissionEnabled(false);
      })
      .finally(() => {
        setCheckingPermission(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 py-6">
      <DialogHeader className="w-full flex items-center">
        <DialogTitle className="font-medium text-xl">
          Check your camera and microphone
        </DialogTitle>
      </DialogHeader>
      <p className="text-muted-foreground text-sm text-center">
        You have up to 120 seconds to record your video. Don’t worry: You can
        review your video before submitting it, and you can re-record if needed.
      </p>
      {checkingPermission && (
        <Button>
          <Loading />
        </Button>
      )}
    </div>
  );
}
