const express = require('express')
const bikeWorkoutDb = require('./bike-repository')

const router = express.Router()
router.get('/bike-workouts', async (req, res) => {
  const workouts = await bikeWorkoutDb.getWorkouts()
  res.status(200).send(workouts)
})

router.post('/bike-workout', async (req, res) => {
  const workout = await bikeWorkoutDb.getWorkouts(req.body.id)
  res.status(200).send(workout)
})

router.post('/bike-workouts', async (req, res) => {
  const success = await bikeWorkoutDb.addWorkout(req.body)
  res.status(200).send(success)
})

module.exports = router
