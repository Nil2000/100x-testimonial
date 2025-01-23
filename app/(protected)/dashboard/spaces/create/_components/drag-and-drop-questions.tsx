"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import QuestionItem from "./question-item";

interface DragAndDropQuestionsProps {
  items: { id: string; question: string; maxLength: number }[];
  setItems: (
    items: { id: string; question: string; maxLength: number }[]
  ) => void;
}

export default function DragAndDropQuestions({
  items,
  setItems,
}: DragAndDropQuestionsProps) {
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return; // Exit if dropped outside a droppable area

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyleType: "none", padding: 0 }}
          >
            {items.map((item: any, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="py-1"
                  >
                    <QuestionItem
                      question={item.question}
                      maxLength={item.maxLength}
                      handleDelete={() => {
                        const updatedItems = items.filter(
                          (i) => i.id !== item.id
                        );
                        setItems(updatedItems);
                      }}
                      handleInputChange={(value: string) => {
                        const updatedItems = items.map((i) =>
                          i.id === item.id ? { ...i, question: value } : i
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
