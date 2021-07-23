import React, { Component, useState, useEffect } from "react"
import './App.css'
import axios from "axios"
import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import CustomToolbar from "./components/CustomToolbar/CustomToolbar"
import ResponsiveDialog from "./components/ResponsiveDialog/ResponsiveDialog"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const App = ()=> {

  // State 
  const [events, setEvents] = useState([])
  const [eventData, setEventData] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  //UseEffect
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then(response=>{
      let arr = []
      response.data.forEach(element => {
        arr.push({title: element.title, status: element.status, assignedTo: element.assignedTo, start: moment(element.startDate,'YYYY-MM-DD').toDate(), end: moment(element.endDate,'YYYY-MM-DD').add(1, "days").toDate()})
      })
      setEvents([...arr])
    }).catch(error=>{
      console.log(error)
    })
  }, [])

  //Events handlers
  const eventClickHandler = event => {
    let arr = [{...event}]
    setEventData([...arr])
    setIsDialogOpen(true)
  }
  // let d2 = moment([2017, 11, 23]);
  // console.log(d2.toDate());
  // console.log(moment().toDate())
  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={["month", "week"]}
        events={events}
        style={{ height: "100vh" }}
        components={{toolbar: CustomToolbar}}
        titleAccessor={(event)=>`${event.title} (${event.assignedTo})`}
        onSelectEvent = {event=>eventClickHandler(event)}
        onShowMore = {
          events=>{
            setEventData([...events])
            setIsDialogOpen(true)
        }}
        messages={{
          showMore: total => (
            <div className="showmore__link">{`+${total} more`}</div>
          ),
        }}
        eventPropGetter={
          (event, start, end, isSelected) => {
            let dueDate = moment(end).format("YYYY-MM-DD")
            let currentDate = moment().format("YYYY-MM-DD")
            let isOverDue = moment(currentDate).isAfter(dueDate)
            let newStyle = {
              backgroundColor: "rgb(52, 211, 52)",
              color: 'black',
            }
            if(event.status!=="Completed" && isOverDue)
              newStyle.backgroundColor = "rgb(221, 75, 75)"
            else{
              if (event.status==="In progress")
                newStyle.backgroundColor = "rgb(69, 175, 211)"
              else if(event.status==="Not started")
                newStyle.backgroundColor = "rgb(240, 173, 110)"
            }
            return {
              className: "",
              style: newStyle
            }
          }
        }
      />
      <ResponsiveDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} eventData={eventData}/>
    </div>
  )
}
export default App