import React from 'react'
import moment from 'moment'
import classes from './DraggableItem.module.css'
import { Draggable } from 'react-beautiful-dnd'

export default function DraggableItem(props) {

    let formattedStartDate = moment(props.element.startDate,'YYYY-MM-DD').format('MM/DD')
    let formattedEndDate = moment(props.element.endDate,'YYYY-MM-DD').format('MM/DD')

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
                            <div className="pb-2">{props.element.title}</div>
                            <div className={`${classes.due__date} pb-2`}>
                                <i className={`far fa-calendar-alt ${classes.calendar__icon}`} aria-hidden="true"/>
                                {formattedStartDate} - {formattedEndDate}
                            </div>
                            <div className="text-info">{props.element.assignedTo}</div>
                        </div>
                    )
                }}
            </Draggable>
    )
}