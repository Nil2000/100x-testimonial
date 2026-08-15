"use client";
import { changeSpaceStatus } from "@/actions/spaceActions";
import { Switch } from "@/components/ui/switch";
import { useSpaceStore } from "@/store/spaceStore";
import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id?: string;
};

export default function PublishSpaceSwitch({ id }: Props) {
  const { spaceInfo, updateSpaceField } = useSpaceStore();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      <Switch
        id={id}
        checked={spaceInfo.isPublished}
        disabled={loading}
        onCheckedChange={() => {
          const nextValue = !spaceInfo.isPublished;
          setLoading(true);
          changeSpaceStatus(spaceInfo.id, nextValue).then((res) => {
            if (res.error) {
              updateSpaceField("isPublished", spaceInfo.isPublished);
              toast.error("Failed to update space visibility");
            } else {
              updateSpaceField("isPublished", nextValue);
              toast.success(nextValue ? "Space published" : "Space unpublished");
            }
            setLoading(false);
          });
        }}
      />
    </div>
  );
}
