import React from "react";
import './cellDays.css'

export default function Cell(props){
    return(
        <article className="cellDays">
            {props.day}
        </article>
    )
}