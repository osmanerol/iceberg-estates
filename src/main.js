import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueMeta)
Vue.config.productionTip = false

import './assets/css/color.css'
import './assets/scss/app.scss'

axios({
  method: 'GET',
  url: '/static/config.json'
}).then(response => {
  const urls = {}
  const baseUrl = process.env.VUE_APP_BASE_URL
  const apiKey = process.env.VUE_APP_API_KEY
  for(var url in response.data) {
    urls[url] = `${baseUrl}${response.data[url]}`
  }
  Vue.prototype.$URL = urls;
  axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
