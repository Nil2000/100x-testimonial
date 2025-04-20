import { toggleAnalysis } from "@/actions/spaceActions";
import { Switch } from "@/components/ui/switch";
import { useSpaceStore } from "@/store/spaceStore";
import React from "react";

export default function AnalysisSwitch() {
  const { spaceInfo, updateSpaceField } = useSpaceStore();
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <h1 className="flex items-center">Testimonial Analysis mode</h1>
      <div>
        <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
          <Switch
            checked={spaceInfo.isAnalysisEnabled}
            onCheckedChange={() => {
              setLoading(true);
              toggleAnalysis(spaceInfo.id, !spaceInfo.isAnalysisEnabled).then(
                (res) => {
                  if (res.error) {
                    updateSpaceField(
                      "isAnalysisEnabled",
                      spaceInfo.isAnalysisEnabled
                    );
                  } else {
                    updateSpaceField(
                      "isAnalysisEnabled",
                      !spaceInfo.isAnalysisEnabled
                    );
                  }
                  setLoading(false);
                }
              );
            }}
            disabled={loading}
            className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full p-1"
          />
          <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
            <span className="text-[10px] font-medium uppercase">
              Not Active
            </span>
          </span>
          <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
            <span className="text-[10px] font-medium uppercase">Active</span>
          </span>
        </div>
      </div>
    </>
  );
}
