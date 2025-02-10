import React from "react";

export default function ListTestimonials({ category }: { category?: string }) {
  return (
    <div key={`list-testimonials-${category}`}>
      ListTestimonials
      {category && <div>Category: {category}</div>}
    </div>
  );
}
