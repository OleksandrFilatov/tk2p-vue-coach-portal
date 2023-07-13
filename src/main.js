import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "vuetify/dist/vuetify.min.css";
import "./index.css"
import VueClipboard from 'vue-clipboard2'
import { createProvider } from './vue-apollo'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faICursor, faSave } from '@fortawesome/free-solid-svg-icons'

library.add(faICursor, faSave)


Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueClipboard)

new Vue({
  router,
  vuetify,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

