import { Card } from "@/components/ui/card";
import { TestimonialResponse } from "@/lib/types";
import React from "react";

type Props = {
  testimonial: TestimonialResponse;
};

export default function TestimonialCard({ testimonial }: Props) {
  return <Card>{JSON.stringify(testimonial)}</Card>;
}
