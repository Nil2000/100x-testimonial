import { toggleSpamDetection } from "@/actions/spaceActions";
import { Switch } from "@/components/ui/switch";
import UpgradeDialog from "@/components/upgrade-dialog";
import { useSpaceStore } from "@/store/spaceStore";
import { usePlanStore } from "@/store/planStore";
import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id?: string;
};

export default function SpamSwitch({ id }: Props) {
  const { spaceInfo, updateSpaceField } = useSpaceStore();
  const { subscription } = usePlanStore();
  const [loading, setLoading] = React.useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = React.useState(false);
  const isFreePlan = (subscription?.plan ?? "FREE") === "FREE";

  return (
    <div className="flex items-center gap-2">
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      <Switch
        id={id}
        checked={spaceInfo.isSpamEnabled}
        onCheckedChange={() => {
          if (isFreePlan) {
            setShowUpgradeDialog(true);
            return;
          }
          setLoading(true);
          toggleSpamDetection(spaceInfo.id, !spaceInfo.isSpamEnabled).then(
            (res) => {
              if (res.error) {
                updateSpaceField("isSpamEnabled", spaceInfo.isSpamEnabled);
                toast.error("Failed to toggle spam detection");
              } else {
                updateSpaceField("isSpamEnabled", !spaceInfo.isSpamEnabled);
                toast.success(res.message);
              }
              setLoading(false);
            }
          );
        }}
        disabled={loading}
      />

      <UpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        title="Upgrade Required"
        description="Spam detection is not available on the Free plan. Please upgrade to continue."
        feature="spam detection"
      />
    </div>
  );
}
