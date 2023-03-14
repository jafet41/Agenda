import React, { useContext, useEffect } from 'react';
import { DateContext } from '../App';
import  { monthNames } from '../constants';
import '../App.css'
import * as Helpers from '../Helpers';

function Navbar(){
    const {_, offset, fechaOffset} = useContext(DateContext)
    const [stateOffset, setStateOffset] = offset
    const [stateFechaOffset,setStateFechaOffset] = fechaOffset
    console.log(_)

    const MONTH_C=stateFechaOffset.getMonth();
    const YEAR_C=stateFechaOffset.getFullYear();
    
    function decrementOffset(){
      setStateOffset( prevOffset => prevOffset - 1 )
    }
    function incrementOffset(){
      setStateOffset( prevOffset => prevOffset + 1 )
    }
    useEffect( () => {
      setStateFechaOffset( () => Helpers.newDate(stateOffset) )
    }, [stateOffset] )

    return(
        <nav className='nav'>
            <div className='buttons'>
              {console.log("Navbar")}
                <button type="button" onClick={decrementOffset}>Back</button>
                <button type="button" onClick={incrementOffset}>Next</button>
            </div>
            <h1 className='month-title'>
              { monthNames[MONTH_C] } { YEAR_C }
            </h1>     
        </nav>
    )
}

export default Navbar;
