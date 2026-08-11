import { toggleSentimentAnalysis } from "@/actions/spaceActions";
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

export default function SentimentSwitch({ id }: Props) {
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
        checked={spaceInfo.isSentimentEnabled}
        onCheckedChange={() => {
          if (isFreePlan) {
            setShowUpgradeDialog(true);
            return;
          }
          setLoading(true);
          toggleSentimentAnalysis(
            spaceInfo.id,
            !spaceInfo.isSentimentEnabled
          ).then((res) => {
            if (res.error) {
              updateSpaceField(
                "isSentimentEnabled",
                spaceInfo.isSentimentEnabled
              );
              toast.error("Failed to toggle sentiment analysis");
            } else {
              updateSpaceField(
                "isSentimentEnabled",
                !spaceInfo.isSentimentEnabled
              );
              toast.success(res.message);
            }
            setLoading(false);
          });
        }}
        disabled={loading}
      />

      <UpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        title="Upgrade Required"
        description="Sentiment analysis is not available on the Free plan. Please upgrade to continue."
        feature="sentiment analysis"
      />
    </div>
  );
}
