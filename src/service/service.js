import Vue from "vue"

export const getAppointments = (offset) => {
  return Vue.axios({
    method: 'GET',
    url: Vue.prototype.$URL.APPOINTMETS
  }).then(response => {
    return response.data
  })
}

export const getAgents = () => {
  return Vue.axios({
    method: 'GET',
    url: Vue.prototype.$URL.AGENTS
  }).then(response => {
    return response.data
  })
}

export const saveContact = (data) => {
  return Vue.axios({
    method: 'POST',
    url: Vue.prototype.$URL.CONTACT,
    data
  }).then(response => {
    return response.data
  })
}

export const saveAppointment = (data) => {
  return Vue.axios({
    method: 'POST',
    url: Vue.prototype.$URL.APPOINTMETS,
    data
  }).then(response => {
    return response.data
  })
}