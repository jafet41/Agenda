import http from "./http-helper";

class AppointmentDataService {
  getByMonth(year,month) {
    return http.get(`/appointments_month?year=${year}&month=${month}`);
  }

  getByDate(fullDate) {
    return http.get(`/appointments_date?fullDate=${fullDate}`);
  }

  createAppointment(data) {
    return http.post("/appointments_new", data);
  }

  updateAppointment(data) {
    return http.put("/appointments_edit", data);
  }

  deleteAppointment(id, userId) {
    return http.delete(`/appointments-delete?id=${id}`, {data:{user_id: userId}});
  }

}

export default new AppointmentDataService();