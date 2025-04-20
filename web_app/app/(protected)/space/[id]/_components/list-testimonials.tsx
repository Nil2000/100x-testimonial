"use client";
import React from "react";
import axios from "axios";
import { useSpaceStore } from "@/store/spaceStore";
import Loading from "@/components/loader";
import TestimonialCard from "./manage-testimonials/testimonial-card";
import { useDebounce } from "@uidotdev/usehooks";
import { feedbackPerPage } from "@/lib/constants";
import PaginationComponent from "@/components/pagination-component";
import { TestimonialResponse } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ShareTestimonialDialog from "./share-testimonial-dialog";
import GetLinkDialog from "./getlink-dialog";
import SortByDropDown from "./sortby-dropdown";

// Sorting function
const sortTestimonials = (
  testimonials: TestimonialResponse[],
  sortBy: string
) => {
  switch (sortBy) {
    case "name-asc":
      return [...testimonials].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...testimonials].sort((a, b) => b.name.localeCompare(a.name));
    case "newest-first":
      return [...testimonials].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    case "oldest-first":
      return [...testimonials].sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
    default:
      return testimonials;
  }
};

type Props = {
  category?: string;
  wallOfLove?: boolean;
  archived?: boolean;
};

export default function ListTestimonials({
  category,
  wallOfLove,
  archived,
}: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [testimonials, setTestimonials] = React.useState<TestimonialResponse[]>(
    []
  );
  const [isOpenShareImage, setIsOpenShareImage] = React.useState(false);
  const [isOpenEmbedTestimonial, setIsOpenEmbedTestimonial] =
    React.useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    React.useState<TestimonialResponse | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name-asc"); // Added state for sorting
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { spaceInfo } = useSpaceStore();
  const [openGetlinkDialog, setOpenGetLinkDialog] = React.useState(false);

  const handleNextPage = () => {
    const isItemsLeft =
      filteredTestimonials.length - currentPage * feedbackPerPage > 0;
    if (isItemsLeft) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/testimonials", {
          params: {
            category,
            spaceId: spaceInfo.id,
            addToWallOfLove: wallOfLove,
            archived,
          },
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

  const removeFromWallOfLove = (id: string) => {
    if (!id) return;

    if (wallOfLove) {
      setTestimonials((prev) => prev.filter((t: any) => t.id !== id));
    }
  };

  const removeFromList = (id: string) => {
    if (!id) return;
    setTestimonials((prev) => prev.filter((t: any) => t.id !== id));
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return (
      testimonial.answer
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      testimonial.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      testimonial.email
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    );
  });

  const sortedTestimonials = sortTestimonials(filteredTestimonials, sortBy); // Apply sorting

  const getTestimonialsByPage = () => {
    const start = (currentPage - 1) * feedbackPerPage;
    const end = start + feedbackPerPage;
    return sortedTestimonials.slice(start, end);
  };

  const totalPages = Math.ceil(filteredTestimonials.length / feedbackPerPage);

  return (
    <div key={`list-testimonials-${category}`} className="w-full p-3 space-y-3">
      <div className="w-full flex justify-between items-center">
        <div className="relative w-1/2">
          <Input
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full ps-9"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        <SortByDropDown onChange={setSortBy} defaultValue={"name-asc"} />
      </div>
      {!filteredTestimonials.length && (
        <div className="w-full text-center text-muted-foreground text-sm italic">
          No testimonials found
        </div>
      )}
      {getTestimonialsByPage().map((testimonial: any) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          removeFromWallOfLove={removeFromWallOfLove}
          shareForEmbed={() => {
            setSelectedTestimonial(testimonial);
            setIsOpenEmbedTestimonial(true);
          }}
          shareForImage={() => {
            setSelectedTestimonial(testimonial);
            setIsOpenShareImage(true);
          }}
          getLink={() => {
            setSelectedTestimonial(testimonial);
            setOpenGetLinkDialog(true);
          }}
          removeFromList={removeFromList}
        />
      ))}
      {filteredTestimonials.length > 0 && (
        <div className="w-full flex justify-center">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      )}
      <ShareTestimonialDialog
        feedbackInfo={selectedTestimonial!}
        isOpen={isOpenShareImage && !!selectedTestimonial}
        onClose={() => {
          setIsOpenShareImage(false);
          setSelectedTestimonial(null);
        }}
      />
      <GetLinkDialog
        isOpen={openGetlinkDialog}
        onClose={() => setOpenGetLinkDialog(false)}
        testimonialId={selectedTestimonial?.id!}
        spaceName={spaceInfo.name}
      />
    </div>
  );
}
