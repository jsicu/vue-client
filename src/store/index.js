import Vue from 'vue'
// import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'
import dictData from './modules/dictData'
import timer from './modules/timer'

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    dictData,
    timer
  },
  getters
})

export default store
