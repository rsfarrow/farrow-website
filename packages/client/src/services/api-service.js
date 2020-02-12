import axios from 'axios'
import { recipeList, recipeExpansion, recipePage, createRecipe } from '../graphql/recipe-queries'
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://farrow.herokuapp.com' : 'http://localhost:4000'
const GRAPHQL_URL = '/graphql'
const GET_BIKE_URL = '/bike-workouts'
const HIGHSCORE_URL = '/highscores'

// TODO: Do some checking on the http status and such.
// TODO: Update the URL

export class APIService {
  async getRecipeList (variables) {
    const payload = { ...recipeList, ...variables }
    return this.sendAxios(BASE_URL + GRAPHQL_URL, 'POST', payload)
  }
  async getRecipeExpansion (variables) {
    const payload = { ...recipeExpansion, ...variables }
    return this.sendAxios(BASE_URL + GRAPHQL_URL, 'POST', payload)
  }
  async getRecipe (variables) {
    const payload = { ...recipePage, ...variables }
    return this.sendAxios(BASE_URL + GRAPHQL_URL, 'POST', payload)
  }
  async createRecipe (variables) {
    const payload = { ...createRecipe, ...variables }
    return this.sendAxios(BASE_URL + GRAPHQL_URL, 'POST', payload)
  }
  async getBikeWorkouts () {
    return this.sendAxios(BASE_URL + GET_BIKE_URL, 'GET')
  }
  async getHighscores () {
    const url = `${BASE_URL}${HIGHSCORE_URL}`
    return this.sendAxios(url, 'GET')
  }
  async sendHighscores (payload) {
    const url = `${BASE_URL}${HIGHSCORE_URL}`
    return this.sendAxios(url, 'POST', payload)
  }
  async sendAxios (uri, method, payload) {
    let token = localStorage.getItem('😎')
    let options = {}
    if (token) {
      options = { Authorization: 'Bearer ' + token }
    }
    try {
      let res = await axios({
        method: method,
        url: uri,
        data: payload,
        headers: options
      })
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
