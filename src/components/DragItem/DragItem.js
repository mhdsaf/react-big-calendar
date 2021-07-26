import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function DragItem(props) {
    return (
            <Draggable key={props.element.id} index={props.index} draggableId={props.element.id}>
                {(provided, snapshot)=>{
                    return(
                        <div
                            className={`item ${snapshot.isDragging && "dragging"}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {props.element.name}
                        </div>
                    )
                }}
            </Draggable>
    )
}