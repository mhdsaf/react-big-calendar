import React from 'react'

export default function Checkbox(props) {
    return (
        <div className="form-check d-inline-block pr-4">
            <input onChange={event=>props.handler(event)} type="checkbox" className="form-check-input" id={props.labelId} defaultChecked/>
            <label className="form-check-label" htmlFor={props.labelId}>{props.children}</label>
        </div>
    )
}
