import React, { useState, useEffect } from 'react';
import './appointment.css'

export default function Appointment(props){
    const [backgroundColor, setBackgroundColor] = useState('color5');
    const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
    
    useEffect(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    }, []);
    return(
        <article className={`appointment ${backgroundColor}`}>
            Cita{' -> '} 
            {props.start.Hour.toLocaleString( 'en-US',{minimumIntegerDigits: 2})}
            :{props.start.Minute.toLocaleString('en-US',{minimumIntegerDigits: 2})}
            -{props.end.Hour.toLocaleString('en-US',{minimumIntegerDigits: 2})}
            :{props.end.Minute.toLocaleString('en-US',{minimumIntegerDigits: 2})}
        </article>
    )
}