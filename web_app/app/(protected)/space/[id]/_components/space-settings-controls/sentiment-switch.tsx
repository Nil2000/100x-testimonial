import { toggleSentimentAnalysis } from "@/actions/spaceActions";
import { Switch } from "@/components/ui/switch";
import { useSpaceStore } from "@/store/spaceStore";
import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SentimentSwitch() {
  const { spaceInfo, updateSpaceField } = useSpaceStore();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          checked={spaceInfo.isSentimentEnabled}
          onCheckedChange={() => {
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
              }
              toast.success(res.message);
              setLoading(false);
            });
          }}
          disabled={loading}
          className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full p-1"
        />
        <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
          <span className="text-[10px] font-medium uppercase">Off</span>
        </span>
        <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
          <span className="text-[10px] font-medium uppercase">On</span>
        </span>
      </div>
    </div>
  );
}
