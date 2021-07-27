import React, {useState, useEffect} from 'react'
import classes from './Task.module.css'
import axios from 'axios'
import _ from 'lodash'
import { DragDropContext} from 'react-beautiful-dnd'
import DroppableContainer from '../../components/DroppableContainer/DroppableContainer'
import Select from 'react-select'
import Checkbox from '../../components/Checkbox/Checkbox'

export default function Task() {

    // UseState
    const [state, setState] = useState({
        "Not started": {
          status: "Not started",
          items: []
        },
        "In progress": {
          status: "In progress",
          items: []
        },
        "Completed": {
          status: "Completed",
          items: []
        }
    })
    const [statusFilter, setStatusFilter] = useState(["Not started", "In progress", "Completed"])
    const [nameFilter, setNameFilter] = useState([])
    const [nameFilterOptions, setNameFilterOptions] = useState([])
    // UseEffect
    useEffect(() => {
        axios.get("http://localhost:5000/tasks").then(response=>{
            let modifiedState = {...state}
            response.data.forEach(element => {
                modifiedState[element.status].items.push(element)
            })
            setState({...modifiedState})
        }).catch(err=>{
            console.log(err)
        })
        axios.get("http://localhost:5000/names").then(response=>{
            let modifiedNameFilterOptions = []
            response.data.forEach(element => {
                modifiedNameFilterOptions.push({label: element, value: element})
            })
            setNameFilterOptions([...modifiedNameFilterOptions])
        }).catch(err=>{
            console.log(err)
        })
    }, [])

    // Handlers
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
    const handleStatusFilterCheckbox = event=>{
        let modifiedStatusFilter = []
        let isFound = false
        for (let i = 0; i < statusFilter.length; i++) {
            if(statusFilter[i]!==event.target.id)
                modifiedStatusFilter.push(statusFilter[i])
            else
                isFound = true
        }
        if(!isFound)
            modifiedStatusFilter.push(event.target.id)
        
        setStatusFilter(modifiedStatusFilter)
    }
    const nameFilterHandler = selected =>{
        let modifiedNameFilter = []
        selected.forEach(element => {
            modifiedNameFilter.push(element.value)
        })
        setNameFilter([...modifiedNameFilter])
    }

    return (
        <div className="mt-4">
            <div className="text-center">
                {
                    _.map(state, (data, key) => {
                        return(
                            <Checkbox key={key} labelId={data.status} handler={handleStatusFilterCheckbox}>{data.status}</Checkbox>
                        )
                    })
                }
            </div><br></br>
            <div className="m-auto" style={{"maxWidth": "400px"}}>
                <Select placeholder="Filter by name
                        "options={nameFilterOptions}
                        isMulti
                        onChange={(e)=>{nameFilterHandler(e)}}
                />
            </div>
            <div className={`${classes.task} container mt-3`}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {
                        _.map(state, (data, key) => {
                            if(statusFilter.includes(data.status))
                                return (
                                    <div className={classes.column} key={key}>
                                        <h3 className={classes.droppable_title}>{data.status}</h3>
                                        <DroppableContainer nameFilter={nameFilter} data={data} _key={key}/>
                                    </div>
                                )
                        })
                    }
                </DragDropContext>
            </div>
        </div>
    )
}