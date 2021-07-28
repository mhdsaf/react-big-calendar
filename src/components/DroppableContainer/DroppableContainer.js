import React from 'react'
import classes from './DroppableContainer.module.css'
import { Droppable } from 'react-beautiful-dnd'
import DraggableItem from '../DraggableItem/DraggableItem'

export default function DroppableContainer(props) {
    return (
        <Droppable droppableId={props._key}>
            {(provided, snapshot)=>{
                return (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${classes.droppable_col} ${snapshot.isDraggingOver && classes.dropping}`}
                    >
                        {
                            props.data.items.map((element, index) => {
                                return(
                                    <DraggableItem element={element} index={index}/>
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
