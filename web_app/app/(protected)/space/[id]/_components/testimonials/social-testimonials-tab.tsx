import React from "react";
import { Button } from "@/components/ui/button";
import TestimonialsListManager from "./testimonials-list-manager";

type SocialPlatform = "X" | "INSTAGRAM";

const socialPlatforms: { label: string; value: SocialPlatform }[] = [
  { label: "Twitter / X", value: "X" },
  { label: "Instagram", value: "INSTAGRAM" },
];

export default function SocialTestimonialsTab() {
  const [platform, setPlatform] = React.useState<SocialPlatform>("X");

  const category = platform;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {socialPlatforms.map((item) => (
          <Button
            key={item.value}
            variant={platform === item.value ? "default" : "outline"}
            onClick={() => setPlatform(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <TestimonialsListManager
        key={`social-${category}`}
        category={category}
        isSocial={true}
        socialPlatform={platform}
      />
    </div>
  );
}
