exports.recipeList = {
  query: `
  {
    recipes {
      _id
      name
      img
    }
  }
  `
}
exports.recipeExpansion = {
  query: `
    query GetRecipe($id: ID!) {
      getRecipe(_id: $id) {
        _id
        totalTime
        servings
        desc
      }
    }
  `
}
// TODO: Update this to get the information we need to finish the recipe details page
exports.recipePage = {
  query: `
  {
    recipes {
      _id
      name
      desc
      img
    }
  }
  `
}
