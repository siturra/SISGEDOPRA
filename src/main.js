// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vinput from './components/Vinput'
import Vsubmit from './components/Vsubmit'
import AlertDanger from './components/AlertDanger'

import VueHttp from './helpers/axios'
import VueAuth from './helpers/auth'

import router from './router'
import store from './store'

import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

window.Popper = require('popper.js').default
window.$ = window.jQuery = require('jquery')
require('bootstrap')

Vue.use(VueHttp)
Vue.use(VueAuth)

Vue.config.productionTip = false

/**
 * Registered components
 */
Vue.component('v-input', Vinput)
Vue.component('v-submit', Vsubmit)
Vue.component('alert-danger', AlertDanger)
Vue.component('clip-loader', ClipLoader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
