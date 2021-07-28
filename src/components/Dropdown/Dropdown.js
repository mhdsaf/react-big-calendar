import React from 'react';
import classes from './Dropdown.module.css'

const Dropdown = (props) => {
    return (
        <div className="dropdown d-inline">
            <button className="btn btn-dark btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                View options
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                    props.labels.map((element, index) => {
                        return(
                            <a  key={index}
                                className={`dropdown-item ${classes.item}`}
                                val={element}
                                onClick={e=>{props.handler(e.target.getAttribute("val"))}}
                                >{element}
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Dropdown