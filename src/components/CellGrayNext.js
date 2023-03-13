import React from "react";
import './cellGray.css';
import './cell.css';

export default function Cell(props){
    let articleCl="cell grayDay";
    return(
        <article className={articleCl}>
            {props.equis +1}
        </article>
    )    
}