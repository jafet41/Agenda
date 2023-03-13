import React, { useContext, useState, useEffect } from 'react';
import  { DateContext } from '../App'
import './cell.css'
import AppointmentList from './AppointmentList'
import './appointment.css'
import * as Helpers from '../Helpers';

export default function CellNormal(props){
    const fechaOff= useContext(DateContext).fechaOffset[0]
    var post=null;
    function postHandler(){
        post=Helpers.handlerAgenda(props.number,fechaOff)
        console.log(post)
    }
    //Getting current day information
    let currentDate = useContext(DateContext).fecha[0]
    const DATE_C=currentDate.getDate();
    //Some styles
    const offset= useContext(DateContext).offset[0]
    const [blueBGH,setBlueBGH]=useState('')
    useEffect(() => {
        if(offset===0 && props.number===DATE_C){ setBlueBGH('presentDay') }
        else{setBlueBGH('')}
    }, [offset]);
 
    return(
        <article className={`cell ${blueBGH}`} onDoubleClick={()=>postHandler()}>
        <span >{props.number}</span>
        <AppointmentList number={props.number}/>
        </article>
    )
}