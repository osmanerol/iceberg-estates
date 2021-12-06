import Vue from 'vue'
import VueRouter from 'vue-router'

// pages
import Home from '../views/Home.vue'
import Appointments from '../views/Appointments.vue'
import CreateAppointment from '../views/CreateAppointment.vue'
import UpdateAppointment from '../views/UpdateAppointment.vue'
import NotFound from '../views/NotFound.vue'

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
    name: 'CreateAppointment',
    component: CreateAppointment
  },
  {
    path: '/appointment/update/:id',
    name: 'UpdateAppointment',
    component: UpdateAppointment
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
