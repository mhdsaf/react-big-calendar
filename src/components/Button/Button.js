import React from 'react'
import classes from "./../CustomToolbar/CustomToolbar.module.css"
export default function Button(props) {
    return (
        <button className={`btn btn-dark btn-sm ${classes.btn}`} onClick={props.handler}>{props.text}</button>
    )
}