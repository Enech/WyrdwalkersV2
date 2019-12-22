import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPersonalTab: 0,
    personalDrawer: false,
    contextDrawer: false
  },
  mutations: {
    setSelectedPersonalTab(state, tabIndex: number){
      state.selectedPersonalTab = tabIndex;
    },
    setPersonalDrawer(state, open: boolean){
      state.personalDrawer = open;
    },
    setContextDrawer(state, open: boolean){
      state.contextDrawer = open;
    }
  },
  getters:{
    contextDrawer: state => state.contextDrawer
  },
  actions: {
  },
  modules: {
  }
})
