import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
// import Home from './views/Home.vue'
import Landing from './views/landing.vue'

Vue.use(VueRouter)
const HOME_ROUTE = '/'
const HOME_NAME = 'landing'
const ABOUT_ROUTE = '/about'
const ABOUT_NAME = 'about'
const SIDE_PROJECTS_ROUTE = '/side-projects'
const SIDE_PROJECTS_NAME = 'side-projects'
const DIGITAL_COOKBOOK_LIST_ROUTE = '/side-projects/digital-cookbook'
const DIGITAL_COOKBOOK_LIST_NAME = 'digital-cookbook-list'
const DIGITAL_COOKBOOK_RECIPE_ROUTE = '/side-projects/digital-cookbook/recipe'
const DIGITAL_COOKBOOK_RECIPE_NAME = 'digital-cookbook-recipe'
const DIGITAL_COOKBOOK_NEW_RECIPE_ROUTE = '/side-projects/digital-cookbook/recipe/add'
const DIGITAL_COOKBOOK_NEW_RECIPE_NAME = 'digital-cookbook-recipe-add'
const WHACK_ROUTE = '/side-projects/whack-a-mole'
const WHACK_NAME = 'whack-a-mole'
const TTT_ROUTE = '/side-projects/tic-tac-toe'
const TTT_NAME = 'tic-tac-toe'
const HIGHSCORE_NAME = 'highscores'
const HIGHSCORE_ROUTE = '/highscores'
const WORKOUTS_BIKE_ROUTE = '/workouts/bike'
const WORKOUTS_BIKE_NAME = 'bike-workout'
const WORKOUTS_BIKE_LIST_ROUTE = '/workouts/bike/list'
const WORKOUTS_BIKE_LIST_NAME = 'bike-workout-list'
const WORKOUTS_BOXING_ROUTE = '/workouts/boxing-timer'
const WORKOUTS_BOXING_NAME = 'boxing-timer'
const WORKOUTS_BOXING_LIST_ROUTE = '/workouts/boxing-timer-list'
const WORKOUTS_BOXING_LIST_NAME = 'boxing-timer-list'
const Whack = () => import('./views/side-projects/whack-a-mole/whack-a-mole.vue')
const Highscore = () => import('./views/side-projects/whack-a-mole/highscores.vue')
const TTT = () => import('./views/side-projects/tic-tac-toe/tic-tac-toe.vue')
const routes = [
  {
    path: '*',
    component: Landing,
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', false)
      store.dispatch('updateShowSideMenu', false)
      store.dispatch('updateGlobalTitle')
      next()
    }
  },
  {
    path: HOME_ROUTE,
    name: HOME_NAME,
    component: Landing,
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', false)
      store.dispatch('updateShowSideMenu', false)
      store.dispatch('updateGlobalTitle')
      next()
    }
  },
  {
    path: ABOUT_ROUTE,
    name: ABOUT_NAME,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/about.vue'),
    component: () => import('./views/about.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'About Me')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: DIGITAL_COOKBOOK_LIST_ROUTE,
    name: DIGITAL_COOKBOOK_LIST_NAME,
    component: () => import('./views/side-projects/recipe/recipe-list.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Digital Cookbook')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: DIGITAL_COOKBOOK_RECIPE_ROUTE,
    name: DIGITAL_COOKBOOK_RECIPE_NAME,
    component: () => import('./views/side-projects/recipe/recipe.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Digital Cookbook')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: DIGITAL_COOKBOOK_NEW_RECIPE_ROUTE,
    name: DIGITAL_COOKBOOK_NEW_RECIPE_NAME,
    component: () => import('./views/side-projects/recipe/new-recipe.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Digital Cookbook')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: WHACK_ROUTE,
    name: WHACK_NAME,
    component: Whack,
    beforeEnter: (to, from, next) => {
      // store.getters.loggedIn ? next() : next({ name: HOME_NAME })
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Whack-A-Mole')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: TTT_ROUTE,
    name: TTT_NAME,
    component: TTT,
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Tic-Tac-Toe')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: HIGHSCORE_ROUTE,
    name: HIGHSCORE_NAME,
    component: Highscore,
    beforeEnter: (to, from, next) => {
      // store.getters.loggedIn ? next() : next({ name: HOME_NAME })
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Whack-A-Mole - Highscores')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: SIDE_PROJECTS_ROUTE,
    name: SIDE_PROJECTS_NAME,
    component: () => import('./views/side-projects/side-projects.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Side Projects')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: WORKOUTS_BIKE_ROUTE,
    name: WORKOUTS_BIKE_NAME,
    component: () => import('./views/side-projects/bike-workouts/bike-workouts.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Bike Workout')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: WORKOUTS_BIKE_LIST_ROUTE, // WORKOUTS_BOXING_ROUTE
    name: WORKOUTS_BIKE_LIST_NAME,
    component: () => import('./views/side-projects/bike-workouts/bike-workout-list.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Bike Workout')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: WORKOUTS_BOXING_ROUTE,
    name: WORKOUTS_BOXING_NAME,
    component: () => import('./views/side-projects/boxing-timer/boxing-timer.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Boxing Timer')
      store.dispatch('updateShowSideMenu', false)
      next()
    }
  },
  {
    path: WORKOUTS_BOXING_LIST_ROUTE,
    name: WORKOUTS_BOXING_LIST_NAME,
    component: () => import('./views/side-projects/boxing-timer/boxing-timer-list.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Boxing Timer')
      store.dispatch('updateShowSideMenu', false)
      next()
    }

  }

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
