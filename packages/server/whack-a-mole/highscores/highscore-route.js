const express = require('express')
const highscoreDb = require('./highscore-repository')

const router = express.Router()

router.get('/highscores', async (req, res) => {
  const scores = await highscoreDb.getTopScores()
  res.status(200).send({ scores })
})

// Send in a score and return the highscores
router.post('/highscores', async (req, res) => {
  let scores = await highscoreDb.getTopScores()
  let success = {}
  let newHighscore = false
  if (scores && scores.length < 5) {
    // so if we have less than the max number of scores we can just add a new high score
    success = await highscoreDb.addNewScore(req.body)
    newHighscore = true
  } else if (req.body.score > scores[4].score) {
    success = await highscoreDb.addNewScore(req.body) // go ahead and throw it in there before we mark new hs
    // There is a new highscore
    newHighscore = true
    req.body.newHighscore = true
    scores.push(req.body)
    scores.sort((a, b) => {
      return b.score - a.score
    })
    scores.splice(5, 1)
  }
  // if we have a message -- it was not a successful insert
  if (success.message) {
    res.status(200).send(success.message)
  } else {
    res.status(200).send({ newHighscore, scores })
  }
})

module.exports = router
