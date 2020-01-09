import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { navTo } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  state: {
    global: {
      globalTitle: 'Farrow Website',
      showAppBar: false,
      showSideMenu: false
    },
    recipe: {
      selectedId: ''
    }
  },
  getters: {
    globalTitle: state => state.global.globalTitle,
    showAppBar: state => state.global.showAppBar,
    showSideMenu: state => state.global.showSideMenu,
    recipeId: state => state.recipe.selectedId
  },
  mutations: {
    updateGlobalTitle (state, newTitle) {
      state.global.globalTitle = newTitle
    },
    updateShowAppBar (state, showAppBar) {
      state.global.showAppBar = showAppBar
    },
    updateShowSideMenu (state, showSideMenu) {
      state.global.showSideMenu = showSideMenu
    },
    updateRecipeId (state, id) {
      state.recipe.selectedId = id
    }
  },
  actions: {
    updateGlobalTitle ({ commit }, title) {
      commit('updateGlobalTitle', title)
    },
    updateShowAppBar ({ commit }, showAppBar) {
      commit('updateShowAppBar', showAppBar)
    },
    updateShowSideMenu ({ commit }, showSideMenu) {
      commit('updateShowSideMenu', showSideMenu)
    },
    updateRecipeId ({ commit }, id) {
      commit('updateRecipeId', id)
    },
    navTo ({ commit }, options) {
      navTo(options.self, options.path, options.internal)
    }
  },
  modules: {
  }
})
