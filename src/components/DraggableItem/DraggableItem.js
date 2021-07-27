import React from 'react'
import classes from './DraggableItem.module.css'
import { Draggable } from 'react-beautiful-dnd'

export default function DraggableItem(props) {
    return (
            <Draggable key={props.element.id} index={props.index} draggableId={props.element.id.toString()}>
                {(provided, snapshot)=>{
                    return(
                        <div
                            className={`${classes.item} ${snapshot.isDragging && classes.dragging}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div>{props.element.title}</div>
                            <div className="text-info">{props.element.assignedTo}</div>
                        </div>
                    )
                }}
            </Draggable>
    )
}