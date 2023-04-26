import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DraggableList({ defaultList }) {

    const [itemList, setItemList] = useState(defaultList);


    // Function to update list on drop
    const handleDrop = (droppedItem) => {
        console.log("🚀 ~ file: DraggableList.jsx:11 ~ handleDrop ~ droppedItem:", droppedItem)
        console.log("🚀 ~ file: DraggableList.jsx:15 ~ handleDrop ~ itemList:", itemList)
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...itemList];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        console.log("🚀 ~ file: DraggableList.jsx:18 ~ handleDrop ~ reorderedItem:", reorderedItem)
        reorderedItem['sorting'] = droppedItem.destination.index
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        console.log("🚀 ~ file: EditorManagerNews.jsx:67 ~ handleDrop ~ updatedList:", updatedList)
        // Update State
        setItemList(updatedList);
    };

    // React state to track order of items
    return (
        <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
                {(provided) => (
                    <div
                        className="list-container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {itemList.map((item, index) =>
                            <Draggable key={item.key} draggableId={item.key} index={index}>
                                {(provided) => (
                                    <div
                                        className="item-container"
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                    >
                                        {JSON.stringify(item)}

                                    </div>
                                )}
                            </Draggable>

                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
