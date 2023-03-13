import React, {useState, useEffect, useContext} from "react"
import  { DateContext } from '../App'
import Appointment from './Appointment'
import './appointment.css'
import AppointmentDataService from "../services/appointments";

export default function AppointmentList(props){
    const fechaOff= useContext(DateContext).fechaOffset[0]
    const dateQuery=new Date(fechaOff.getFullYear(),fechaOff.getMonth(),props.number)
    const isoQuery=dateQuery.toISOString()
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        retrieveAppointments(isoQuery)
    }, [fechaOff])
    
    const retrieveAppointments = (isoQ) => {
        AppointmentDataService.getByDate(isoQ)
        .then(response => {
            console.log("got appointments arr");
            setAppointments(response.data.appointments);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const [backgroundColor, setBackgroundColor] = useState('color2');
    const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
    useEffect(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    }, [])
    
    return(
        <>
        {appointments && 
            appointments.slice(0, 3).map( x => 
            <Appointment start={x.start} end={x.end} key={`aId-${x.start.Hour*60+x.start.Minute}`}/>
            )
        }
        {appointments.length>3 && 
            <article className={`appointment ${backgroundColor}`}> 
              Mas... 
            </article>
        }
        </>
    );
}