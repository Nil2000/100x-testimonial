"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import QuestionItem from "../app/(protected)/dashboard/spaces/create/_components/question-item";
import { CreateSpaceQuestion } from "@/lib/types";

interface DragAndDropQuestionsProps {
  items: CreateSpaceQuestion[];
  setItems: (items: CreateSpaceQuestion[]) => void;
  handleDeleteItem?: (id: string) => void;
}

export default function DragAndDropQuestions({
  items,
  setItems,
}: DragAndDropQuestionsProps) {
  const handleOnDragEnd = (result: {
    destination: { index: number } | null;
    source: { index: number };
  }) => {
    if (!result.destination) return; // Exit if dropped outside a droppable area

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed px-3 py-6 text-center text-sm text-muted-foreground">
        No questions yet. Add one to tell people what to talk about.
      </p>
    );
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list-none p-0"
          >
            {items.map((item, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={
                      snapshot.isDragging ? "py-1 opacity-90" : "py-1"
                    }
                  >
                    <QuestionItem
                      question={item.title}
                      maxLength={item.maxLength}
                      position={index + 1}
                      dragHandleProps={provided.dragHandleProps}
                      handleDelete={() => {
                        const updatedItems = items.filter(
                          (i) => i.id !== item.id
                        );
                        setItems(updatedItems);
                      }}
                      handleInputChange={(value: string) => {
                        const updatedItems = items.map((i) =>
                          i.id === item.id ? { ...i, title: value } : i
                        );
                        setItems(updatedItems);
                      }}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
