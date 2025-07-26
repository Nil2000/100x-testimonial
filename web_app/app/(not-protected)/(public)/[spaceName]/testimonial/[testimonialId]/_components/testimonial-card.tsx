import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { SingleTestimonialWithSpaceLogo } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  testimonial: SingleTestimonialWithSpaceLogo;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <Card className="flex flex-col justify-center mt-3 w-full md:max-w-lg mx-auto min-h-52 py-6">
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <Image
          src={testimonial.space!.logo!}
          alt="Space Logo"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
        <div className="flex items-center space-x-1">
          {renderStars(testimonial.rating)}
        </div>

        {testimonial.answer && testimonial.answer.length > 0 && (
          <p className="text-lg">"{testimonial.answer}"</p>
        )}
        {testimonial.videoUrl && (
          <video
            className="w-full aspect-video rounded-lg"
            src={testimonial.videoUrl}
            controls
          />
        )}
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={testimonial.imageUrl || "/default-avatar.png"}
              alt="User Avatar"
              className="rounded-full"
            />
            <AvatarFallback>
              {testimonial.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-muted-foreground">
            {testimonial.name}
          </h2>
        </div>
      </div>
    </Card>
  );
}

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <Star key={index} className="w-5 h-5 text-yellow-500" fill="currentColor" />
  ));
};
