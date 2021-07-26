import React from 'react'
import classes from './DropContainer.module.css'
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
                        className={`${classes.droppable_col} ${snapshot.isDraggingOver && classes.dropping}`}
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
