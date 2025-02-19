"use client";
import React from "react";
import axios from "axios";
import { useSpaceStore } from "@/store/spaceStore";
import Loading from "@/components/loader";
export default function ListTestimonials({ category }: { category?: string }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [testimonials, setTestimonials] = React.useState([]);
  const { spaceInfo } = useSpaceStore();
  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/testimonials", {
          params: { category, spaceId: spaceInfo.id },
        });
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div key={`list-testimonials-${category}`}>
      ListTestimonials the
      {category && <div>Category: {category}</div>}
      {JSON.stringify(testimonials)}
    </div>
  );
}
