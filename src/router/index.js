import Vue from 'vue'
import VueRouter from 'vue-router'

// pages
import Home from '../views/Home.vue'
import Appointments from '../views/Appointments.vue'
import NewAppointment from '../views/NewAppointment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: '/new-appointment',
    name: 'NewAppointment',
    component: NewAppointment
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
