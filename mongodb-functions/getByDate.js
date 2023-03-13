//GET by specific date
exports = async function(payload, response) {

  const date =new Date(payload.query.fullDate);
  const startDate= new Date( date.getFullYear(), date.getMonth(), date.getDate() )
  const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1 )

  let query = { "appointmentDate": { $gte: startDate, $lt:  endDate } }

  const collection = context.services.get("mongodb-atlas").db("appointments_db").collection("appointments");
  let appointmentsList = await collection.find(query).toArray()

  appointmentsList.forEach(appointment => {
    appointment._id = appointment._id.toString();
  });
  
  let appointmentsListS = appointmentsList.sort(
    (p1,p2)=>(p1.start.Hour*60+p1.start.Minute > p2.start.Hour*60+p2.start.Minute) ? 1 :
              (p1.start.Hour*60+p1.start.Minute < p2.start.Hour*60+p2.start.Minute) ? -1 : 0);
  
  const responseData = {
    appointments: appointmentsListS,
    total_results: appointmentsListS.length
  };
  
  return responseData
  };