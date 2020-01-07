const { transformRecipe } = require('./merge')
const RecipeDB = require('../../models/recipe')

module.exports = {
  recipes: async () => {
    try {
      const recipes = await RecipeDB.find()
      return recipes.map(recipe => {
        return transformRecipe(recipe)
      })
    } catch (err) {
      throw err
    }
  },
  getRecipe: async ({ _id }) => {
    const fetchedRecipe = await RecipeDB.findOne({ _id: _id })
    if (!fetchedRecipe) {
      throw new Error('Recipe does not exist!')
    }
    return transformRecipe(fetchedRecipe)
  },
  createRecipe: async (args, req) => {
    console.log('')
    const recipe = new RecipeDB({
      name: args.recipeInput.name,
      desc: args.recipeInput.desc,
      source: args.recipeInput.source,
      category: args.recipeInput.category,
      prepTime: args.recipeInput.prepTime,
      cookTime: args.recipeInput.cookTime,
      totalTime: args.recipeInput.totalTime,
      servings: args.recipeInput.servings,
      ingredients: args.recipeInput.ingredients,
      instructions: args.recipeInput.instructions,
      img: args.recipeInput.img
    })
    // TODO: Save the creator of a recipe, and only allow a user to save if they are registered
    // let createdRecipe
    try {
      const result = await recipe.save()
      // createdRecipe = transformRecipe(result)
      return transformRecipe(result)
      // const creator = await User.findById(req.userId)
      // if (!creator) {
      //   throw new Error('User not found')
      // }
      // creator.createdEvents.push(event)
      // await creator.save()
      // return createdRecipe
    } catch (err) {
      throw err
    }
  //   if (!req.isAuth) {
  //     throw new Error('Unauthenticated')
  //   }
  //   const event = new Event({
  //     creator: req.userId,
  //     title: args.eventInput.title,
  //     desc: args.eventInput.desc,
  //     price: +args.eventInput.price,
  //     date: dateToString(args.eventInput.date),
  //   })
  //   let createdEvent
  //   try {
  //     const result = await event.save()
  //     createdEvent = transformEvent(result)
  //     const creator = await User.findById(req.userId)
  //     if (!creator) {
  //       throw new Error('User not found')
  //     }
  //     creator.createdEvents.push(event)
  //     await creator.save()
  //     return createdEvent
  //   } catch (err) {
  //     throw err
  //   }
  }
}
