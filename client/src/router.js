import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
// import Home from './views/Home.vue'
import Landing from './views/landing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', false)
      store.dispatch('updateGlobalTitle')
      next()
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/side-projects',
    name: 'side-projects',
    component: () => import('./views/side-projects/side-projects.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Side Projects')
      next()
    }
  },
  {
    path: '/side-projects/digital-cookbook',
    name: 'digital-cookbook-list',
    component: () => import('./views/side-projects/recipe/recipe-list.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Digital Cookbook')
      next()
    }
  },
  {
    path: '/side-projects/digital-cookbook/recipe',
    name: 'digital-cookbook-recipe',
    component: () => import('./views/side-projects/recipe/recipe.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('updateShowAppBar', true)
      store.dispatch('updateGlobalTitle', 'Digital Cookbook')
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
