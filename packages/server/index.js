const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const expressStaticGzip = require('express-static-gzip')

// const bike = require('./bike-workouts/index')
const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')
const app = express()

/**
 * Connect to the Mongoose DB
 */
var retry = 1
const connectToDB = () => {
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@recipe-website-venom-w6sn2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(
      () => { console.log('DB connection successful') },
      err => {
        console.log('Error when connecting to db ... \n' + err)
        if (retry < 30) {
          console.log('Retrying...#', retry)
          retry++
          setTimeout(() => { connectToDB() }, 5000)
        }
      })
}
connectToDB()

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)
app.use('/', expressStaticGzip(path.join(__dirname, '../client/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000')
  }
}))

// Regular APIs
// app.use(bike.routes)

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}))

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('listening on port: ' + port)
})
