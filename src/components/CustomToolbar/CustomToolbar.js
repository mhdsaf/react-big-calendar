import React, {useState, useEffect} from 'react'
import moment from "moment"
import classes from "./CustomToolbar.module.css"
import Button from '../Button/Button'
import LabelIcon from '../LabelIcon/LabelIcon'
import Dropdown from '../Dropdown/Dropdown'

export default function CustomToolbar(toolbar) {

    const [view, setView] = useState("month") // default view is monthly

    useEffect(() => {
        console.log('here')
        if(view==="week")
            toolbar.onView("week")
        else if(view=="month")
            toolbar.onView("month")
    }, [view])

    const goToBack = () => {
        let newDate = ""
        if(view==="week"){
            newDate = new Date(toolbar.date.getFullYear(), toolbar.date.getMonth(), toolbar.date.getDate() - 7, 1);
            toolbar.onNavigate("prev", newDate)
        }
        else if(view==="month"){
            toolbar.date.setMonth(toolbar.date.getMonth() - 1);
            toolbar.onNavigate("prev", newDate);
        }
    }

    const goToNext = () => {
        let newDate = ""
        if(view==="week"){
            newDate = new Date(toolbar.date.getFullYear(), toolbar.date.getMonth(), toolbar.date.getDate() + 7, 1);
            toolbar.onNavigate("next", newDate)
        }
        else if(view==="month"){
            toolbar.date.setMonth(toolbar.date.getMonth() + 1);
            toolbar.onNavigate('next');
        }
    };

    const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('current');
    };

    const toggleView = view=>{
        setView(view.toLowerCase())
    }

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
        );
    };
    return (
        <div className={classes.toolbar__container}>
            <div class={classes.flex__container}>
                <div>
                    <Button text="Today" handler={goToCurrent}/>
                    <Button text="Back" handler={goToBack}/>
                    <Button text="Next" handler={goToNext}/>
                    <Dropdown labels={["Month", "Week"]} toggleView={toggleView}/>
                </div>
                <div>
                    <span>{label()}</span>
                </div>
                <div>
                    <LabelIcon color="rgb(52, 211, 52)"> Completed</LabelIcon>
                    <LabelIcon color="rgb(69, 175, 211)"> In progress</LabelIcon>
                    <LabelIcon color="rgb(240, 173, 110)"> Not started</LabelIcon>
                    <LabelIcon color="rgb(221, 75, 75)"> Overdue</LabelIcon>
                </div>
            </div>
        </div>
    )
}