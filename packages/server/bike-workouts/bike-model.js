const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
  length: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  workout: {
    type: Array,
    required: true
  }
})

const BikeWorkout = mongoose.model('BikeWorkout', bikeSchema)

module.exports = BikeWorkout
