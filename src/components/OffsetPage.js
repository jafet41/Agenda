import React, { useContext} from 'react';
import  { DateContext } from '../App'
import '../App.css';
import * as Helpers from '../Helpers';
import  {dayNames, leapNumDays, numDays} from '../constants'
import CellNormal from './CellNormal';
import CellDays from './CellDays';
import CellGrayPrev from './CellGrayPrev';
import CellGrayNext from './CellGrayNext';

function OffsetPage() {
  let fecha = useContext(DateContext).fechaOffset[0]
  //Getting information about the offset month
  const DATE_C=fecha.getDate();
  const MONTH_C=fecha.getMonth();
  const YEAR_C=fecha.getFullYear();
  //Arrays that represent days of the current month
  let MONTH_DAYS=[ ...Array( numDays[MONTH_C] ).keys() ];
  //Getting number of gray cells for the previous and next month
  const FIRST_ONES= Helpers.getFirst(DATE_C,fecha.getDay());
  let LAST_ONES= Helpers.getLast(numDays[MONTH_C], FIRST_ONES);
  //Checking if the year to display is a leap year
  const IS_LEAP=Helpers.isLeap(YEAR_C)
  //If is leap year make the porper adjustments
  if(IS_LEAP){
    MONTH_DAYS = [ ...Array( leapNumDays[MONTH_C] ).keys() ];
    LAST_ONES= Helpers.getLast(leapNumDays[MONTH_C], FIRST_ONES);
  }
  //Arrays that represent days of the previous and next month
  const PREV_MONTH = [ ...Array( FIRST_ONES ).keys() ]
  const NEXT_MONTH = [ ...Array( LAST_ONES ).keys() ]   
  return (
    <div className='parent'>
      {console.log("from OFFSET PAGE")}
       <div className='sevenColGrid'>
        { dayNames.map( (d,idx) => <CellDays day={d} key={`${idx}`} /> )}
        { PREV_MONTH.map( (x) => <CellGrayPrev equis={x} isLeap={IS_LEAP} len={PREV_MONTH.length} month={MONTH_C-1} key={`prv-${x}`} /> ) }
        { MONTH_DAYS.map( (num) => <CellNormal number={num+1} key={`cN-${num+1}`}/>  ) }
        { NEXT_MONTH.map( (x) => <CellGrayNext equis={x} key={`nxt-${x}`} /> ) }
        <br />
       </div>
       <br />
    </div>
  );
}

export default OffsetPage