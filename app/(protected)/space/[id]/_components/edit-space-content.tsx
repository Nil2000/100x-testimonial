"use client";
import React from "react";
import VerticalTabsWrapper from "./vertical-tabs-wrapper";
import axios from "axios";
import Loading from "@/components/loader";

export default function EditSpaceContent({ spaceInfo }: { spaceInfo: any }) {
  return (
    <div className="h-full">
      <VerticalTabsWrapper />
    </div>
  );
}
