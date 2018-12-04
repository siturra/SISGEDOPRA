import axios from 'axios'

export default function (Vue) {
  Vue.axios = axios

  Object.defineProperties(Vue.prototype, {
    axios: {
      get: () => {
        return Vue.axios
      }
    }
  })
}
