import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MarqueeDemo } from "./demo-marquee";
import { cn } from "@/lib/utils";
type Props = {
  selectedStyle: string;
  selectedStyleOption?: any;
};

export default function WallOfLovePreviewContainer({
  selectedStyle,
  selectedStyleOption,
}: Props) {
  console.log(selectedStyleOption);
  return (
    <div
      className="relative w-full sm:w-[70vw] lg:w-[800px] h-[50vh] border rounded-md space-y-2"
      key="preview-container-wall-of-love"
    >
      <div className="h-1/3 w-2/3 mx-auto pt-2 flex flex-col items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Wall of love"
          width={1974}
          height={400}
          className="object-cover rounded-md h-full w-full"
        />
      </div>
      {selectedStyle == "list" && (
        <div className="w-2/3 mx-auto h-2/3 p-2">{generateList()}</div>
      )}
      {selectedStyle == "carousel" && (
        <div className="w-1/2 mx-auto h-max p-2 flex justify-center">
          {generateCarousel(selectedStyleOption)}
        </div>
      )}
      {selectedStyle == "infiniteScrollHorizontal" && (
        <div className="relative w-2/3 mx-auto h-2/3 p-2 overflow-hidden">
          {generateInfiniteScroll({
            direction: "horizontal",
            rows: Number(selectedStyleOption.rows),
          })}
        </div>
      )}
      {selectedStyle == "infiniteScrollVertical" && (
        <div className="w-2/3 mx-auto h-2/3 p-2 overflow-hidden">
          {generateInfiniteScroll({
            direction: "vertical",
            columns: Number(selectedStyleOption.columns),
          })}
        </div>
      )}
      {/* <div className="w-2/3 mx-auto h-2/3 p-2 overflow-hidden">
        {generateInfiniteScroll({
          direction: "horizontal",
          rows: Number(selectedStyleOption.rows),
        })}
      </div> */}
      {/* <div className="w-[50vw] mx-auto h-2/3 p-2 overflow-hidden">
        <MarqueeDemo />
      </div> */}
    </div>
  );
}

const generateList = () => {
  return (
    <div className="flex gap-2 h-full w-full">
      <div className="flex flex-col items-center h-full gap-2 w-1/3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index + "list1"}
            className="w-full h-10 bg-primary mb-2 rounded-md flex items-center justify-center"
          >
            <p className="text-gray-700 text-sm">List Item {index + 1}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center h-full gap-2 w-1/3">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index + "list2"}
            className="w-full h-10 bg-primary mb-2 rounded-md flex items-center justify-center"
          >
            <p className="text-gray-700 text-sm">List Item {index + 1}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center h-full gap-2 w-1/3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index + "list3"}
            className="w-full h-10 bg-primary mb-2 rounded-md flex items-center justify-center"
          >
            <p className="text-gray-700 text-sm">List Item {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const generateCarousel = (selectedStyleOption: any) => {
  const basisClass =
    selectedStyleOption.columns == 1
      ? ""
      : selectedStyleOption.columns == 2
      ? "basis-1/2"
      : "basis-1/3";
  const carouselClass =
    selectedStyleOption.columns == 1
      ? "w-1/3"
      : selectedStyleOption.columns == 2
      ? "w-2/3"
      : "w-full";
  return (
    <Carousel className={carouselClass}>
      <CarouselContent>
        {Array.from({ length: 5 }, (_, index) => (
          <CarouselItem className={basisClass} key={index}>
            <Card className="bg-secondary">
              <CardContent className="flex items-center justify-center p-6 h-[10rem]">
                <span className="text-3xl font-semibold">{index + 1}</span>
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
}) => {
  const direction = selectedStyleOption.direction;
  const noOfRowsOrColumns =
    direction == "horizontal"
      ? selectedStyleOption.rows
      : selectedStyleOption.columns;
  return (
    <div
      className={`relative flex w-full h-[30vh] ${
        direction == "vertical" ? "flex-row" : "flex-col"
      } items-center justify-center overflow-hidden gap-2`}
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
          {Array.from({ length: 5 }, (_, index) => (
            <Card
              className="bg-secondary flex items-center justify-center h-9 w-9 rounded-md"
              key={index}
            >
              <span className="md:text-2xl font-semibold">{index + 1}</span>
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
