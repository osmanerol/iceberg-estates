import Vue from 'vue'
import VueRouter from 'vue-router'

// pages
import Home from '../views/Home.vue'
import Appointments from '../views/Appointments.vue'
import CreateAppointment from '../views/CreateAppointment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: '/appointment/create',
    name: 'NewAppointment',
    component: CreateAppointment
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
