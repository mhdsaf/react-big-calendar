import React from 'react'

export default function Radio(props) {
    let defaultChecked = props.id==="All"?true:false
    return (
        <div className="form-check d-inline-block pr-4">
            <input onChange={(event)=>props.handler(event)} className="form-check-input" type="radio" name={props.groupName} id={props.id} defaultChecked={defaultChecked}/>
            <label className="form-check-label" htmlFor={props.id}>
                {props.children}
            </label>
        </div>
    )
}
