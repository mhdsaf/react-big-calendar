import React, { useState, useEffect } from "react"
import './Calendar.css'
import axios from "axios"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from "react-big-calendar"
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar"
import ResponsiveDialog from "../../components/ResponsiveDialog/ResponsiveDialog"

moment.locale('ko', { // let weekly view start from monday to sunday
  week: {
      dow: 1,
      doy: 1,
  }
})
const localizer = momentLocalizer(moment)

const _Calendar = ()=> {

  // State 
  const [events, setEvents] = useState([]) // all events that appear on the calendar
  const [eventData, setEventData] = useState({}) // data about a specific event that is used in dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false) // dialog (modal) open or close

  //UseEffect
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then(response=>{ // get all events from backend and save them to state
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
  const eventClickHandler = event => { // show dialog upon clicking on an event
    setEventData({...event})
    setIsDialogOpen(true)
  }
  return (
    <div className="App">
      <Calendar
        popup
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={["month", "week"]}
        events={events}
        style={{ height: "100vh" }}
        components={{toolbar: CustomToolbar}}
        titleAccessor={(event)=>`${event.title} (${event.assignedTo})`}
        onSelectEvent = {event=>eventClickHandler(event)}
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
              backgroundColor: "#4DD778", // green color for completed
              color: 'black',
            }
            if(event.status!=="Completed" && isOverDue)
              newStyle.backgroundColor = "#FF5B5B" // red color for overdue
            else{
              if (event.status==="In progress")
                newStyle.backgroundColor = "rgb(69, 175, 211)" // light blue color for in progress
              else if(event.status==="Not started")
                newStyle.backgroundColor = "#FC7150" // orange color for not started
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
export default _Calendar