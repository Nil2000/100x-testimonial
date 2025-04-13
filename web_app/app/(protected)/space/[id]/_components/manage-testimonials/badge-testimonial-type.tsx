import { Badge } from "@/components/ui/badge";
import React from "react";

export default function BadgeOfTestimonials({
  category,
}: {
  category: "TEXT" | "VIDEO";
}) {
  return (
    <Badge className="text-xs">
      {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
    </Badge>
  );
}
