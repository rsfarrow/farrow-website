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
const WHACK_ROUTE = '/side-projects/whack-a-mole'
const WHACK_NAME = 'whack-a-mole'
const HIGHSCORE_NAME = 'highscores'
const HIGHSCORE_ROUTE = '/highscores'
const Whack = () => import('./views/side-projects/whack-a-mole/whack-a-mole.vue')
const Highscore = () => import('./views/side-projects/whack-a-mole/highscores.vue')
const routes = [
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
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: DIGITAL_COOKBOOK_LIST_ROUTE,
    name: DIGITAL_COOKBOOK_LIST_NAME,
    component: () => import('./views/side-projects/recipe/recipe-list.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Digital Cookbook')
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
