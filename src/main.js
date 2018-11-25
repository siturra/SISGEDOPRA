// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vinput from './components/Vinput'
import Vsubmit from './components/Vsubmit'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/**
 * Axios configure
 */
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * Registered components
 */
Vue.component('v-input', Vinput)
Vue.component('v-submit', Vsubmit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
