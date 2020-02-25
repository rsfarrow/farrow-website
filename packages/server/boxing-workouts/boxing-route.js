const express = require('express')
const boxingWorkoutDb = require('./boxing-repository')

const router = express.Router()
router.get('/boxing-workouts', async (req, res) => {
  const workouts = await boxingWorkoutDb.getWorkouts()
  res.status(200).send(workouts)
})

router.post('/boxing-workout', async (req, res) => {
  const workout = await boxingWorkoutDb.getWorkouts(req.body.id)
  res.status(200).send(workout)
})

router.post('/boxing-workouts', async (req, res) => {
  const success = await boxingWorkoutDb.addWorkout(req.body)
  res.status(200).send(success)
})

module.exports = router
