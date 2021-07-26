import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DragItem from '../DragItem/DragItem'
export default function DropContainer(props) {
    return (
        <Droppable droppableId={props._key}>
            {(provided, snapshot)=>{
                return (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`droppable-col ${snapshot.isDraggingOver && "dropping"}`}
                    >
                        {
                            props.data.items.map((element, index) => {
                                return(
                                    <DragItem element={element} index={index}/>
                                )
                            })
                        }
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )
}
