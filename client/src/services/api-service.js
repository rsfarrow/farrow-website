import axios from 'axios'
import { recipeList, recipeExpansion, recipePage, createRecipe } from '../graphql/recipe-queries'
const url = process.env.NODE_ENV === 'production' ? 'https://farrow.herokuapp.com/graphql' : 'http://localhost:4000/graphql'

// TODO: Do some checking on the http status and such.
// TODO: Update the URL

export class APIService {
  async getRecipeList (variables) {
    const payload = { ...recipeList, ...variables }
    return this.sendAxios(url, 'POST', payload)
  }
  async getRecipeExpansion (variables) {
    const payload = { ...recipeExpansion, ...variables }
    return this.sendAxios(url, 'POST', payload)
  }
  async getRecipe (variables) {
    const payload = { ...recipePage, ...variables }
    return this.sendAxios(url, 'POST', payload)
  }
  async createRecipe (variables) {
    const payload = { ...createRecipe, ...variables }
    console.log(payload)
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
