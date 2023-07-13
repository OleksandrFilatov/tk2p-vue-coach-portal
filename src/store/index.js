import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import program from './program'
import media from './media'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    program,
    media
  }
})
