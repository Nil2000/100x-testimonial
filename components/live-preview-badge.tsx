import React from "react";

export default function LivePreviewbadge({ location }: { location: string }) {
  return (
    <div className="absoulute top-0 mt-[-1rem] w-max text-center font-semibold rounded-full bg-green-500/10 py-1 px-2 text-green-600 text-xs">
      Live preview - {location} page
    </div>
  );
}
