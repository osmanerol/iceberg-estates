import Vue from "vue"

export const getAppointments = () => {
  return Vue.axios({
    method: 'GET',
    url: Vue.prototype.$URL.GET_APPOINTMETS
  }).then(response => {
    return response.data
  })
}