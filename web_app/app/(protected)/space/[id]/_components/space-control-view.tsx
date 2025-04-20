"use client";
import { useSpaceStore } from "@/store/spaceStore";
import React from "react";
import PublishSpaceSwitch from "./space-controls/publish-space-switch";
import AnalysisSwitch from "./space-controls/analysis-switch";

export default function SpaceControlView() {
  return (
    <div className="grid grid-cols-2 p-4 gap-y-3">
      <PublishSpaceSwitch />
      <AnalysisSwitch />
    </div>
  );
}
