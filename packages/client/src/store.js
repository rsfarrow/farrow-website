import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { navTo } from '@/utils'

Vue.use(Vuex)

// Default settings for WAM
const defaultSettings = {
  darkMode: false,
  customCursor: true
}

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
      selectedId: '',
      category: ''
    },
    loggedIn: false,
    guest: false,
    user: {},
    bikeWorkout: {},
    boxingWorkout: {},
    settings: defaultSettings
  },
  getters: {
    globalTitle: state => state.global.globalTitle,
    showAppBar: state => state.global.showAppBar,
    showSideMenu: state => state.global.showSideMenu,
    recipeId: state => state.recipe.selectedId,
    category: state => state.recipe.category,
    name: state => state.user.name,
    email: state => state.user.email || 'Guest',
    loggedIn: state => state.loggedIn,
    darkMode: state => state.settings.darkMode,
    customCursor: state => state.settings.customCursor,
    guestUser: state => state.guest,
    bikeWorkout: state => state.bikeWorkout,
    numOfRounds: state => state.boxingWorkout.numOfRounds,
    roundLength: state => state.boxingWorkout.roundLength,
    restLength: state => state.boxingWorkout.restLength,
    initialCountdown: state => state.boxingWorkout.initialCountdown,
    quitPopup: state => state.boxingWorkout.quitPopup,
    workout: state => state.boxingWorkout.workout
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
    },
    updateCategory (state, category) {
      state.recipe.category = category
    },
    updateLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    updateUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = {}
    },
    updateDarkMode (state, dark) {
      state.settings.darkMode = dark
    },
    updateCustomCursor (state, custom) {
      state.settings.customCursor = custom
    },
    resetSettings (state) {
      state.settings = defaultSettings
    },
    updateGuestSettings (state, guest) {
      state.guest = guest
    },
    updateBikeWorkout (state, workout) {
      state.bikeWorkout = workout
    },
    updateBikeWorkoutTimer (state, time) {
      state.bikeWorkout = { ...state.bikeWorkout, ...time }
    },
    clearBikeWorkoutTimer (state) {
      delete state.bikeWorkout.timeLeft
      delete state.bikeWorkout.timePassed
    },
    updateBoxingWorkout (state, workout) {
      state.boxingWorkout = workout
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
    updateCategory ({ commit }, category) {
      commit('updateCategory', category)
    },
    navTo ({ commit }, options) {
      navTo(options.self, options.path, options.internal)
    },
    logInUser ({ commit }, user) {
      commit('updateLoggedIn', true)
      commit('updateUser', user)
    },
    logOutUser ({ commit }) {
      commit('updateLoggedIn', false)
      commit('clearUser')
      commit('resetSettings')
      commit('updateGuestSettings', false)
    },
    signInAsGuest ({ commit }, name) {
      commit('updateLoggedIn', true)
      commit('updateGuestSettings', true)
      commit('updateUser', { name: name, email: '' })
      commit('updateGuestSettings', true)
    },
    turnOnDarkMode ({ commit }) {
      commit('updateDarkMode', true)
    },
    turnOffDarkMode ({ commit }) {
      commit('updateDarkMode', false)
    },
    turnOnCustomCursor ({ commit }) {
      commit('updateCustomCursor', true)
    },
    turnOffCustomCursor ({ commit }) {
      commit('updateCustomCursor', false)
    },
    updateBikeWorkout ({ commit }, bikeWorkout) {
      commit('updateBikeWorkout', bikeWorkout)
    },
    updateName ({ commit }, name) {
      commit('updateUser', { name, email: '' })
    },
    updateBoxingWorkout ({ commit }, boxingWorkout) {
      commit('updateBoxingWorkout', boxingWorkout)
    },
    updateBikeTimers ({ commit }, timers) {
      commit('updateBikeWorkoutTimer', timers)
    },
    clearBikeTimers ({ commit }) {
      commit('clearBikeWorkoutTimer')
    }
  },
  modules: {
  }
})
