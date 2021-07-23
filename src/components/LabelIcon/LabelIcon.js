import React from 'react';

const LabelIcon = (props) => {
    return (
        <span className="pr-3 d-inline-block">
            <i className="fa fa-square" aria-hidden="true" style={{color: props.color}}></i>{props.children}
        </span>
    )
}

export default LabelIcon