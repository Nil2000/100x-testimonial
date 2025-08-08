"use client";
import React from "react";
import axios from "axios";
import { useSpaceStore } from "@/store/spaceStore";
import Loading from "@/components/loader";
import { useDebounce } from "@uidotdev/usehooks";
import { feedbackPerPage } from "@/lib/constants";
import PaginationComponent from "@/components/pagination-component";
import { TestimonialResponse } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Import, PlusIcon, SearchIcon } from "lucide-react";
import TestimonialSortDropdown from "./testimonial-sort-dropdown";
import TestimonialItemCard from "./cards/testimonial-item-card";
import TestimonialShareDialog from "../sharing/testimonial-share-dialog";
import ShareableLinkDialog from "../sharing/shareable-link-dialog";
import ImportSocialDialog from "./import-social-dialog";
import { Button } from "@/components/ui/button";
import SocialMedialTestimonialCard from "./cards/social-medial-testimonial-card";
import cuid2, { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";

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
  isSocial?: boolean;
};

export default function ListTestimonials({
  category,
  wallOfLove,
  archived,
  isSocial,
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
  const [openImportDialog, setOpenImportDialog] = React.useState(false);

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
            isSocial: isSocial ? "true" : "false",
          },
        });
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
        toast.error("Failed to load testimonials. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [category, isSocial]);

  if (isLoading) {
    return <Loading />;
  }

  const removeFromWallOfLove = (id: string) => {
    if (!id) return;

    if (wallOfLove) {
      setTestimonials((prev) => prev.filter((t: any) => t.id !== id));
      toast.success("Testimonial removed from wall of love");
    }
  };

  const removeFromList = (id: string) => {
    if (!id) return;
    setTestimonials((prev) => prev.filter((t: any) => t.id !== id));
    toast.success("Testimonial deleted successfully");
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
        {isSocial && (
          <Button variant="outline" onClick={() => setOpenImportDialog(true)}>
            <Import size={16} className="text-muted-foreground/80 mr-2" />{" "}
            Import
          </Button>
        )}
        <TestimonialSortDropdown
          onChange={setSortBy}
          defaultValue={"name-asc"}
        />
      </div>
      {!filteredTestimonials.length && (
        <div className="w-full text-center text-muted-foreground text-sm italic">
          No testimonials found
        </div>
      )}
      {!isSocial
        ? getTestimonialsByPage().map((testimonial: any) => (
            <TestimonialItemCard
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
          ))
        : getTestimonialsByPage().map((testimonial: any) => (
            <SocialMedialTestimonialCard
              key={createId()}
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
      <TestimonialShareDialog
        feedbackInfo={selectedTestimonial!}
        isOpen={isOpenShareImage && !!selectedTestimonial}
        onClose={() => {
          setIsOpenShareImage(false);
          setSelectedTestimonial(null);
        }}
      />
      <ShareableLinkDialog
        isOpen={openGetlinkDialog && !!selectedTestimonial}
        onClose={() => {
          setOpenGetLinkDialog(false);
          setSelectedTestimonial(null);
        }}
        testimonialId={selectedTestimonial?.id!}
        spaceName={spaceInfo.name}
      />
      {isSocial && (
        <ImportSocialDialog
          isOpen={openImportDialog}
          onClose={(result) => {
            setOpenImportDialog(false);
            if (result.type === "success" && result.data) {
              setTestimonials((prev) => [...prev, result.data]);
              toast.success("Social media testimonial imported successfully!");
            }
            if (result.type === "error") {
              console.error("Import error:", result.error);
              toast.error(
                result.error ||
                  "Failed to import testimonial. Please try again."
              );
            }
          }}
          platform={"X"}
          spaceId={spaceInfo.id}
        />
      )}
    </div>
  );
}
