const mongoose = require('mongoose')

const boxingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  workoutLength: {
    type: String,
    required: true
  },
  roundLength: Number,
  restLength: Number,
  workout: {
    type: Array,
    require: true
  }
})

const BoxingWorkout = mongoose.model('BoxingWorkout', boxingSchema)

module.exports = BoxingWorkout
