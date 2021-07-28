import React, {useState, useEffect} from 'react'
import classes from './Task.module.css'
import Checkbox from '../../components/Checkbox/Checkbox'
import Radio from '../../components/Radio/Radio'
import DroppableContainer from '../../components/DroppableContainer/DroppableContainer'
import axios from 'axios'
import _ from 'lodash'
import Select from 'react-select'
import { DragDropContext} from 'react-beautiful-dnd'

const dateOptions = ["All", "Today", "Tomorrow", "This week", "This month"] // filter by date options
export default function Task() {

    // UseState
    const [state, setState] = useState({}) // holds all tasks
    const [filter, setFilter] = useState({ // holds all filters (filter by assigned name and by due date)
        assignedTo: "",
        dueDate: ""
    })
    const [statusFilter, setStatusFilter] = useState(["Not started", "In progress", "Completed"]) // filter by status
    const [nameFilterOptions, setNameFilterOptions] = useState([]) // for dropdown when using filter by assigned name

    // UseEffect
    useEffect(() => {
        axios.get("http://localhost:5000/names").then(response=>{ // get names from backend to show them in dropdown when using filter by assigned name
            let modifiedNameFilterOptions = []
            response.data.forEach(element => {
                modifiedNameFilterOptions.push({label: element, value: element})
            })
            setNameFilterOptions([...modifiedNameFilterOptions])
        }).catch(err=>{
            console.log(err)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/tasks?assignedTo=${filter.assignedTo}&dueDate=${filter.dueDate}`).then(response=>{ // get tasks from backend with filters (if any)
            let modifiedState = {
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
            }
            response.data.forEach(element => {
                modifiedState[element.status].items.push(element)
            })
            setState({...modifiedState})
        }).catch(err=>{
            console.log(err)
        })
    }, [filter])

    // Handlers
    const handleDragEnd = ({destination, source})=>{ // dragging tasks from one column to other
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
            return prev
        })
    }
    const handleStatusFilter = event=>{ // handles filter by status (not started, in progress, completed)
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
    const handleNameFilter = selected =>{ // handles filter by assigned name
        let modifiedNameFilter = ""
        let modifiedFilter = {...filter} // copy state
        selected.forEach(element => {
            modifiedNameFilter += element.value + ","
        })
        modifiedFilter.assignedTo = modifiedNameFilter // set the new filter for name
        setFilter({...modifiedFilter}) // set the new state
    }
    const handleDateFilter = event =>{ // handles filter by date radio buttons
        let modifiedFilter = {...filter}
        if(event.target.id.toLowerCase() === "all")
            modifiedFilter.dueDate = ""
        else
            modifiedFilter.dueDate = event.target.id.toLowerCase()
        setFilter({...modifiedFilter})
    }

    return (
        <div className="mt-4">
            <div className="text-center">
                {
                    _.map(state, (data, key) => {
                        return(
                            <Checkbox key={key} labelId={data.status} handler={handleStatusFilter}>{data.status}</Checkbox>
                        )
                    })
                }
            </div><br/>
            <div className="text-center">
                {
                    dateOptions.map((element, index) => {
                        return(
                            <Radio handler={handleDateFilter} groupName="dateFilter" id={element} key={index}>{element}</Radio>
                        )
                    })
                }
            </div><br/>
            <div className="m-auto" style={{"maxWidth": "400px"}}>
                <Select placeholder="Filter by assigned name
                        "options={nameFilterOptions}
                        isMulti
                        onChange={(e)=>{handleNameFilter(e)}}
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
                                        <DroppableContainer data={data} _key={key}/>
                                    </div>
                                )
                        })
                    }
                </DragDropContext>
            </div>
        </div>
    )
}