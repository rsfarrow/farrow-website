const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  source: String,
  category: Array,
  prepTime: String,
  cookTime: String,
  totalTime: String,
  servings: String,
  ingredients: { type: Array, required: true },
  instructions: { type: Array, required: true },
  likes: Number,
  comments: Array,
  pic: String,
  img: String
  // nutrients: { type: Object, required: true } TODO: Connect this to a nutrients object
}, {
  timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)
