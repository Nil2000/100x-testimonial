import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export default function MetricsCard({ title, value, icon: Icon }: Props) {
  return (
    <Card className="flex sm:justify-start justify-center">
      <div className="flex items-center p-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground/80">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <h3 className="text-sm font-medium text-muted-foreground/80 max-w-20 sm:max-w-full">
            {title}
          </h3>
          <h2 className="text-lg font-semibold text-primary">{value}</h2>
        </div>
      </div>
    </Card>
  );
}
