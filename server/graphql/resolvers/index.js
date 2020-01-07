const authResolver = require('./auth')
const eventsResolver = require('./events')
const bookingResolver = require('./booking')
const recipeResolver = require('./recipe')

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...recipeResolver
}

module.exports = rootResolver
