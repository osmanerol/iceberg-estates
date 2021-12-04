import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.config.productionTip = false

import './assets/css/color.css'
import './assets/scss/app.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
