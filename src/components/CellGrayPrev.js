import React from "react";
import './cell.css';
import './cellGray.css';
import  {numDays} from '../constants'

export default function Cell(props){
    let articleCl="cell grayDay";
    let finalPrevD=numDays[props.month];
    let leap_offset=0;
    if (props.isLeap && props.month===1) leap_offset=1;
    if (props.month===-1) finalPrevD=numDays[11];
    return(
        <article className={articleCl}>
            {finalPrevD - props.len + (props.equis+1) + leap_offset}
        </article>
    )    
}