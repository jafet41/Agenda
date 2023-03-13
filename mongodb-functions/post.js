function inBetween(a,x,y){
  let inB = false;
  // Verificar si [aa:aa] esta dentro del rango [xx:xx-yy:yy]
  if( (a.Hour>x.Hour && a.Hour<y.Hour) || 
      ( (a.Hour>x.Hour || (a.Hour===x.Hour && a.Minute>=x.Minute)) && 
        (a.Hour===y.Hour && a.Minute<y.Minute || a.Hour<y.Hour)  
      )
  )
  {
    inB = true;
  }
  return inB;
}
//------------------------------------------------------------------------------------------
function isCollision(rec, sortedArray){
  const len=sortedArray.length
  if(len===0){return false}
  let col=false;
  if(len===1){
    col = inBetween(rec.start, sortedArray[0].start, sortedArray[0].end) || 
         inBetween(rec.end, sortedArray[0].start, sortedArray[0].end)
    return col
  }
  let [f1,f2,f3]=[false,false,false]
  for (var i = 0; i < len-1; i++) {
      f1=inBetween(rec.start, sortedArray[i].start, sortedArray[i].end)
      f2=inBetween(rec.end, sortedArray[i].start, sortedArray[i].end)
      f3=inBetween(rec.end, sortedArray[i+1].start, sortedArray[i+1].end)
      if(f1||f2||f3){
        col=true
        return col
      }
  }
  col=inBetween(rec.start, sortedArray[len-1].start, sortedArray[len-1].end)
  return col;
}
//================================================================================================================
//POST and check if there is any collision 
exports = async function(payload, response) {
  if (payload.body) {
      const body =  EJSON.parse(payload.body.text());
      
      const date =new Date(body.appointmentDate);
      const startDate= new Date( date.getFullYear(), date.getMonth(), date.getDate() )
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1 )
      const query = { "appointmentDate": { $gte: startDate, $lt:  endDate } }
      
      const appointments = context.services.get("mongodb-atlas").db("appointments_db").collection("appointments");
      let tmp=await appointments.find(query).toArray()

      let appointmentsSorted = tmp.sort(
              (p1,p2)=>(p1.start.Hour*60+p1.start.Minute > p2.start.Hour*60+p2.start.Minute) ? 1 :
              (p1.start.Hour*60+p1.start.Minute < p2.start.Hour*60+p2.start.Minute) ? -1 : 0);
      
      const appointmentDoc = {
          start: body.start,
          end: body.end,
          appointmentDate: date,
      };


      if( !isCollision(appointmentDoc, appointmentsSorted) ){
        return await appointments.insertOne(appointmentDoc);
      }else{
        return "Error en la Base de Datos: colision de citas";
      }
  }
  return  {};
};