"use client";
import { useSpaceStore } from "@/store/spaceStore";
import { usePlanStore } from "@/store/planStore";
import React from "react";
import PublishSpaceSwitch from "../space-settings-controls/publish-space-switch";
import SentimentSwitch from "../space-settings-controls/sentiment-switch";
import SpamSwitch from "../space-settings-controls/spam-switch";
import DeleteSpaceDialog from "../space-settings-controls/delete-space-dialog";
import { deleteSpace } from "@/actions/spaceActions";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type SettingRowProps = {
  id: string;
  label: string;
  description: string;
  badge?: React.ReactNode;
  control: React.ReactNode;
  children?: React.ReactNode;
};

function SettingRow({
  id,
  label,
  description,
  badge,
  control,
  children,
}: SettingRowProps) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
              {label}
            </Label>
            {badge}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="shrink-0">{control}</div>
      </div>
      {children}
    </div>
  );
}

function CollectionUrlRow({ spaceName }: { spaceName: string }) {
  const [copied, setCopied] = React.useState(false);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${spaceName}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error("Failed to copy link. Please try again."));
  };

  return (
    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2">
      <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
        {url}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 shrink-0 px-2"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  );
}

export default function SpaceControlView() {
  const { spaceInfo } = useSpaceStore();
  const { subscription } = usePlanStore();
  const router = useRouter();
  const isFreePlan = (subscription?.plan ?? "FREE") === "FREE";

  const handleDelete = async () => {
    try {
      const res = await deleteSpace(spaceInfo.id);
      if (res?.error) {
        toast.error("Failed to delete space. Please try again.");
        return false;
      }
      router.push("/dashboard");
      return true;
    } catch (error) {
      console.error("Failed to delete space:", error);
      toast.error("Failed to delete space. Please try again.");
      return false;
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          General
        </h3>
        <div className="mt-2 divide-y">
          <SettingRow
            id="publish-space"
            label="Publish space"
            description="Anyone with the link can submit testimonials while your space is published."
            badge={
              spaceInfo.isPublished ? (
                <Badge>Live</Badge>
              ) : (
                <Badge variant="outline">Draft</Badge>
              )
            }
            control={<PublishSpaceSwitch id="publish-space" />}
          >
            {spaceInfo.isPublished && (
              <CollectionUrlRow spaceName={spaceInfo.name} />
            )}
          </SettingRow>
        </div>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            AI analysis
          </h3>
          <Badge variant="outline" className="text-[10px] font-normal">
            Beta
          </Badge>
        </div>
        <div className="mt-2 divide-y">
          <SettingRow
            id="sentiment-analysis"
            label="Sentiment analysis"
            description={
              isFreePlan
                ? "Automatically detect emotional tone and categorize testimonials. Available on paid plans."
                : "Automatically detect emotional tone and categorize testimonials."
            }
            badge={
              isFreePlan && (
                <Badge variant="outline" className="text-[10px] font-normal">
                  Pro
                </Badge>
              )
            }
            control={<SentimentSwitch id="sentiment-analysis" />}
          />
          <SettingRow
            id="spam-detection"
            label="Spam detection"
            description={
              isFreePlan
                ? "Automatically flag low-quality or irrelevant submissions. Available on paid plans."
                : "Automatically flag low-quality or irrelevant submissions."
            }
            badge={
              isFreePlan && (
                <Badge variant="outline" className="text-[10px] font-normal">
                  Pro
                </Badge>
              )
            }
            control={<SpamSwitch id="spam-detection" />}
          />
        </div>
      </section>

      <Separator />

      <section className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-0.5">
          <h3 className="text-sm font-medium text-destructive">
            Danger zone
          </h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete this space and all its testimonials.
          </p>
        </div>
        <DeleteSpaceDialog
          spaceName={spaceInfo.name}
          handleDelete={handleDelete}
        />
      </section>
    </div>
  );
}
