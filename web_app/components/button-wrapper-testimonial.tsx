import { cn } from "@/lib/utils";
import { Loader2, LucideIcon } from "lucide-react";
import React from "react";
type Props = {
  buttonAction: () => void;
  buttonIcon: LucideIcon;
  className?: string;
};
export default function ButtonWrapperTestimonailCard({
  buttonAction,
  buttonIcon: ButtonIcon,
  className,
}: Props) {
  const [isPending, startTransition] = React.useTransition();
  const handleButtonClick = () => {
    startTransition(() => {
      buttonAction();
    });
  };
  return (
    <button className={cn(className)} onClick={handleButtonClick}>
      {isPending ? (
        <Loader2 className="animate-spin text-muted-foreground" size={18} />
      ) : (
        <ButtonIcon size={18} />
      )}
    </button>
  );
}
