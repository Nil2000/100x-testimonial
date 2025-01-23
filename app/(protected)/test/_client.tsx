"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [items, setItems] = React.useState([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
    { id: "4", content: "Item 4" },
  ]);

  // Handle item reordering
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
                    style={{
                      padding: "10px",
                      margin: "5px 0",
                      backgroundColor: "transparent",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.content}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="float-end"
                      onClick={() => {
                        setItems(items.filter((i) => i.id !== item.id));
                      }}
                    >
                      Delete
                    </Button>
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
