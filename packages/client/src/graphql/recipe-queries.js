exports.recipeList = {
  query: `
  query Recipes($category: String) {
    recipes(category: $category) {
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

exports.recipePage = {
  query: `
  query GetRecipe($id: ID!) {
    getRecipe(_id: $id) {
      _id
      name
      desc
      source
      prepTime
      cookTime
      totalTime
      servings
      ingredients
      instructions
      img
    }
  }
  `
}

exports.createRecipe = {
  query: `
  mutation CreateRecipe($recipeInput: RecipeInput) {
       createRecipe(recipeInput: $recipeInput) {
         _id
         name
         category
       }
     }
  `
}
