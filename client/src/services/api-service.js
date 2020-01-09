import axios from 'axios'
import { recipeList, recipeExpansion, recipePage } from '../graphql/recipe-queries'
const url = 'http://localhost:4000/graphql'

// TODO: Do some checking on the http status and such.
// TODO: Update the URL

export class APIService {
  async getRecipeList () {
    return this.sendAxios(url, 'POST', recipeList)
  }
  async getRecipeExpansion (variables) {
    const payload = { ...recipeExpansion, ...variables }
    return this.sendAxios(url, 'POST', payload)
  }
  async getRecipe (variables) {
    const payload = { ...recipePage, ...variables }
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
