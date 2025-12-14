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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center p-6 gap-4">
        <div className="rounded-lg bg-primary/10 p-3 flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col items-start justify-center gap-1.5 min-w-0">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          <h2 className="text-2xl font-bold text-foreground tabular-nums">
            {value}
          </h2>
        </div>
      </div>
    </Card>
  );
}
