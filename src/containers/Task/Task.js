import React, {useState} from 'react'
import './Task.css'
import {v4} from 'uuid'
import _ from 'lodash'
import { DragDropContext} from 'react-beautiful-dnd'
import DropContainer from '../../components/DropContainer/DropContainer'

const item1 = {
    id: v4(),
    name: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
}
  
const item2 = {
    id: v4(),
    name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}

const item3 = {
    id: v4(),
    name: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}

const item4 = {
    id: v4(),
    name: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here."
}

export default function Task() {
    const [state, setState] = useState({
        "Not started": {
          title: "Not started",
          items: [item1, item2, item3, item4]
        },
        "In progress": {
          title: "In Progress",
          items: []
        },
        "Completed": {
          title: "Completed",
          items: []
        }
    })
    const handleDragEnd = ({destination, source})=>{
        if (!destination) {
            console.log("Dropped in an empty space")
            return
        }
      
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            console.log("Dropped in the same column")
            return
        }
      
          // Creating a copy of item before removing it from state
        const itemCopy = {...state[source.droppableId].items[source.index]}
        setState(prev => {
            prev = {...prev}
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)
      
            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
            console.log(prev)
            return prev
        })
    }
    return (
        <div className="Task container mt-5">
            <DragDropContext onDragEnd={handleDragEnd}>
                {
                    _.map(state, (data, key) => {
                        return (
                            <div className="column" key={key}>
                                <h3 className="droppable-title">{data.title}</h3>
                                <DropContainer data={data} _key={key}/>
                            </div>
                        )
                    })
                }
            </DragDropContext>
        </div>
    )
}