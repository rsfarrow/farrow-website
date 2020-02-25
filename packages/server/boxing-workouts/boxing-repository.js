let boxingWorkoutDb = require('./boxing-model')

const getWorkouts = async (_id) => {
  if (_id) {
    return boxingWorkoutDb.findOne({ _id }, { __v: false })
  } else {
    return boxingWorkoutDb.find({}, { __v: false })
  }
}

const addWorkout = async (workout) => {
  return boxingWorkoutDb.insertMany(workout)
    .catch(err => {
      return err
    })
}
module.exports = { getWorkouts, addWorkout }
