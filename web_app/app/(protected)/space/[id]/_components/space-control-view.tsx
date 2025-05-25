"use client";
import { useSpaceStore } from "@/store/spaceStore";
import React from "react";
import PublishSpaceSwitch from "./space-controls/publish-space-switch";
import AnalysisSwitch from "./space-controls/analysis-switch";
import DeleteSpaceDialog from "./space-controls/delete-space-dialog";
import { deleteSpace } from "@/actions/spaceActions";
import { useRouter } from "next/navigation";

export default function SpaceControlView() {
  const { spaceInfo } = useSpaceStore();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteSpace(spaceInfo.id);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete space:", error);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-y-3">
      <PublishSpaceSwitch />
      <AnalysisSwitch />
      <DeleteSpaceDialog handleDelete={handleDelete} />
    </div>
  );
}
