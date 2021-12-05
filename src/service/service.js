import Vue from "vue"

export const getAppointments = (offset) => {
  return Vue.axios({
    method: 'GET',
    url: Vue.prototype.$URL.GET_APPOINTMETS
  }).then(response => {
    return response.data
  })
}

export const getAgents = () => {
  return Vue.axios({
    method: 'GET',
    url: Vue.prototype.$URL.GET_AGENTS
  }).then(response => {
    return response.data
  })
}