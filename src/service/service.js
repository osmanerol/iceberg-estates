import Vue from "vue"

export const getAppointments = () => {
  return Vue.axios({
    method: 'GET',
    url: Vue.prototype.$URL.APPOINTMETS
  }).then(response => {
    return response.data
  })
}

export const getAppointment = (id) => {
  return Vue.axios({
    method: 'GET',
    url: `${Vue.prototype.$URL.APPOINTMETS}/${id}`
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

export const updateAppointment = (data) => {
  return Vue.axios({
    method: 'PATCH',
    url: Vue.prototype.$URL.APPOINTMETS,
    data
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

export const updateContact = (data) => {
  return Vue.axios({
    method: 'PATCH',
    url: Vue.prototype.$URL.CONTACT,
    data
  }).then(response => {
    return response.data
  })
}
