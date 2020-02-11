let bikeWorkoutDb = require('./bike-model')

const getWorkouts = async (_id) => {
  if (_id) {
    return bikeWorkoutDb.findOne({ _id }, { __v: false })
  } else {
    return bikeWorkoutDb.find({}, { __v: false })
  }
}

const addWorkout = async (workout) => {
  return bikeWorkoutDb.insertMany(workout)
    .catch(err => {
      return err
    })
}
module.exports = { getWorkouts, addWorkout }
