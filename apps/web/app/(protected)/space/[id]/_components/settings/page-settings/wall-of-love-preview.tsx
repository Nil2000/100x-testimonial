import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
type Props = {
  selectedStyle: string;
  selectedStyleOption: Record<string, string | number | boolean | undefined>;
};

export default function WallOfLovePreviewContainer({
  selectedStyle,
  selectedStyleOption,
}: Props) {
  return (
    <div
      className="relative w-full bg-gradient-to-br from-background via-background to-muted/20 rounded-lg border overflow-hidden"
      key="preview-container-wall-of-love"
    >
      {/* Header Section */}
      <div className="w-full bg-background/80 backdrop-blur-sm border-b px-6 py-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Wall of Love
          </h2>
          <p className="text-sm text-muted-foreground">
            See what our customers are saying
          </p>
        </div>
      </div>

      {/* Preview Content */}
      <div className="w-full p-6 min-h-[400px] flex items-center justify-center">
        {selectedStyle == "list" && (
          <div className="w-full max-w-5xl mx-auto">
            {generateList(selectedStyleOption)}
          </div>
        )}
        {selectedStyle == "carousel" && (
          <div className="w-full max-w-4xl mx-auto flex justify-center">
            {generateCarousel(selectedStyleOption)}
          </div>
        )}
        {selectedStyle == "infiniteScrollHorizontal" && (
          <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
            {generateInfiniteScroll({
              direction: "horizontal",
              rows: Number(selectedStyleOption.rows),
              cardVariant: String(selectedStyleOption.cardVariant),
              showRating: String(selectedStyleOption.showRating),
              showDate: String(selectedStyleOption.showDate),
              gap: String(selectedStyleOption.gap),
            })}
          </div>
        )}
        {selectedStyle == "infiniteScrollVertical" && (
          <div className="w-full max-w-5xl mx-auto overflow-hidden">
            {generateInfiniteScroll({
              direction: "vertical",
              columns: Number(selectedStyleOption.columns),
              cardVariant: String(selectedStyleOption.cardVariant),
              showRating: String(selectedStyleOption.showRating),
              showDate: String(selectedStyleOption.showDate),
              gap: String(selectedStyleOption.gap),
            })}
          </div>
        )}
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}

const generateList = (
  styleOptions: Record<string, string | number | boolean | undefined>
) => {
  const columns = parseInt(String(styleOptions?.columns || "3"));
  const gapClass = getGapClass(String(styleOptions?.gap));
  const cardVariant = String(styleOptions?.cardVariant || "classic");
  const showRating = styleOptions?.showRating !== "false";
  const showDate = styleOptions?.showDate !== "false";

  const columnsArray = Array.from({ length: columns }, (_, i) => i);

  return (
    <div className={cn("flex h-full w-full", gapClass)}>
      {columnsArray.map((colIndex) => (
        <div
          key={`col-${colIndex}`}
          className={cn("flex flex-col h-full w-full", gapClass)}
        >
          {Array.from({ length: colIndex === 1 ? 4 : 3 }, (_, index) => (
            <Card
              key={index + `list${colIndex}`}
              className={cn(
                "w-full p-2 flex flex-col items-center justify-center",
                getCardVariantClasses(cardVariant)
              )}
            >
              <p className="text-[8px] font-semibold">
                Testimonial {index + 1}
              </p>
              {showRating && (
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className="w-2 h-2 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
              {showDate && (
                <p className="text-[6px] text-muted-foreground mt-1">
                  Dec 7, 2025
                </p>
              )}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

const generateCarousel = (
  selectedStyleOption: Record<string, string | number | boolean | undefined>
) => {
  const columns = parseInt(String(selectedStyleOption?.columns || "2"));
  const cardVariant = String(selectedStyleOption?.cardVariant || "classic");
  const showRating = selectedStyleOption?.showRating !== "false";
  const showDate = selectedStyleOption?.showDate !== "false";

  const basisClass =
    columns == 1 ? "" : columns == 2 ? "basis-1/2" : "basis-1/3";
  const carouselClass =
    columns == 1 ? "w-1/3" : columns == 2 ? "w-2/3" : "w-full";
  return (
    <Carousel className={carouselClass}>
      <CarouselContent>
        {Array.from({ length: 5 }, (_, index) => (
          <CarouselItem className={basisClass} key={index}>
            <Card className={cn(getCardVariantClasses(cardVariant))}>
              <CardContent className="flex flex-col items-center justify-center p-3 h-[8rem]">
                <span className="text-xs font-semibold">
                  Testimonial {index + 1}
                </span>
                {showRating && (
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                )}
                {showDate && (
                  <p className="text-[8px] text-muted-foreground mt-2">
                    Dec 7, 2025
                  </p>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious size={"sm"} />
      <CarouselNext size={"sm"} className="h-6 w-6 p-2">
        <ArrowRightIcon />
      </CarouselNext>
    </Carousel>
  );
};

const generateInfiniteScroll = (selectedStyleOption: {
  columns?: number;
  rows?: number;
  direction?: string;
  cardVariant?: string;
  showRating?: string;
  showDate?: string;
  gap?: string;
}) => {
  const direction = selectedStyleOption.direction;
  const noOfRowsOrColumns =
    direction == "horizontal"
      ? selectedStyleOption.rows
      : selectedStyleOption.columns;
  const cardVariant = selectedStyleOption?.cardVariant || "classic";
  const showRating = selectedStyleOption?.showRating !== "false";
  const showDate = selectedStyleOption?.showDate !== "false";
  const gapClass = getGapClass(selectedStyleOption?.gap);

  return (
    <div
      className={cn(
        "relative flex w-full h-[30vh] items-center justify-center overflow-hidden",
        direction == "vertical" ? "flex-row" : "flex-col",
        gapClass
      )}
    >
      {Array.from({ length: noOfRowsOrColumns! }, (_, index) => (
        <Marquee
          key={index}
          vertical={direction == "vertical"}
          pauseOnHover
          className={cn(
            index % 2 == 0 ? "[--duration:10s]" : "[--duration:20s]"
          )}
          reverse={index % 2 == 0 ? true : false}
        >
          {Array.from({ length: 5 }, (_, cardIndex) => (
            <Card
              className={cn(
                "flex flex-col items-center justify-center h-12 w-16 rounded-md p-1",
                getCardVariantClasses(cardVariant)
              )}
              key={cardIndex}
            >
              <span className="text-[8px] font-semibold">T{cardIndex + 1}</span>
              {showRating && (
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className="w-1.5 h-1.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
              {showDate && (
                <p className="text-[6px] text-muted-foreground mt-0.5">Dec 7</p>
              )}
            </Card>
          ))}
        </Marquee>
      ))}
      <div
        className={`pointer-events-none absolute ${
          direction == "vertical"
            ? "inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"
            : "inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"
        }`}
      ></div>
      <div
        className={`pointer-events-none absolute ${
          direction == "vertical"
            ? "inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"
            : "inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"
        }`}
      ></div>
    </div>
  );
};

const getCardVariantClasses = (variant: string) => {
  switch (variant) {
    case "glass":
      return "bg-white/20 backdrop-blur-lg border-white/40 shadow-lg text-foreground";
    case "dark":
      return "bg-zinc-900 text-white border-zinc-700 shadow-xl";
    case "classic":
    default:
      return "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground shadow-sm";
  }
};

const getGapClass = (gap?: string) => {
  switch (gap) {
    case "tight":
      return "gap-1";
    case "relaxed":
      return "gap-3";
    case "normal":
    default:
      return "gap-2";
  }
};
