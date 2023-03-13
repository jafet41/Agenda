import AppointmentDataService from "./services/appointments";

export function getFirst(currentDay,dayOfWeek){
    let firstDay=dayOfWeek-(currentDay%7)+1;
    if(firstDay<0) return firstDay+7;
    if(firstDay===0) return 7;
    return firstDay;
}
export function getLast(monthLength,firstDay){
    let total=monthLength+firstDay;
    return 7-total%7;
}
//Anio Bisiesto  
export function isLeap(year){
      let isL=false
      if( year%4===0 && (year%100!==0||year%400===0) )  isL=true
      return isL
}
//Update date
export function newDate(offset){
    let tmp= new Date()
    let currentMonth=tmp.getMonth();
    let currentYear=tmp.getFullYear(); 
    if(offset===0) return tmp;
    let totalMonths=(currentMonth + 1) + offset;
    let totalYears=Math.trunc(totalMonths/12);
    let remainderMonths=totalMonths%12
    tmp=new Date(currentYear+totalYears,remainderMonths-1)
    return tmp
}

//---------------------------Manejador de agenda-------------------------------
export function handlerAgenda(num,fecha){
    const YEAR=fecha.getFullYear();
    const MONTH=fecha.getMonth();
    const DATE=num;
    const appointmentDate=new Date(YEAR, MONTH, DATE)
  
    const ans=prompt(`¿A que hora quieres que inicie tu cita? 
                        \nEl formato es -> HH:MM
                        \nLos valores de HH son de 00-23
                        \nLos valores de MM son de 00-59 
                        \nLa duracion de una cita es de 30 Minutos:  `,"08:00")
    //Regex Pattern for validation
    const pattern=/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/
    try{
       if(pattern.exec(ans)[0]){
           const stringAns=pattern.exec(ans)[0]
           let objStart={}
           objStart.Hour=Number(stringAns[0]+stringAns[1])
           objStart.Minute=Number(stringAns[3]+stringAns[4])
           let objEnd={}
           objEnd.Minute=objStart.Minute+30
           if(objEnd.Minute>59){
               let overflow=Math.trunc(objEnd.Minute/60)
               objEnd.Hour=objStart.Hour+overflow
               objEnd.Minute=objEnd.Minute%60
           } else {
               objEnd.Hour=objStart.Hour
           }
           
           let appointmentObj={}
           appointmentObj.start=objStart
           appointmentObj.end=objEnd
           appointmentObj.appointmentDate=appointmentDate
           
           //POST the data to mongoDB
           AppointmentDataService.createAppointment(appointmentObj)
               .then( response => {
                   if(response.data.insertedId){
                        alert("Cita creada:" +response.data.insertedId)
                   }
                   else{
                       alert(response.data)
                       console.log(response)
                   }
               })
               .catch(e => {
                   console.log(e);
                   alert(e)
               })
       }
   } catch (e){
       alert("Ingresaste Datos Invalidos")
   } finally{
   }
}
