const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Event {
  _id: ID!
  title: String!
  desc: String!
  price: Float!
  date: String!
  creator: User!
}
input EventInput {
  title: String!
  desc: String!
  price: Float!
  date: String!
}
type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}
input UserInput {
  email: String!
  password: String!
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
type Booking {
  _id: ID!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
}
###########RECIPE STUFF NOW################
##TODO: Add Nutrients info -- link in another type##
##TODO: Add user info -- link in another type##
##TODO: Add comments/ratings info -- link in another type##
type Recipe {
  _id: ID!
  name: String!
  desc: String!
  source: String
  category: [String!]!
  prepTime: String
  cookTime: String
  totalTime: String
  servings: String
  ingredients: [String!]!
  instructions: [String!]!
  img: String
}
input RecipeInput {
  name: String!
  desc: String!
  source: String
  category: [String!]!
  prepTime: String
  cookTime: String
  totalTime: String
  servings: String
  ingredients: [String!]!
  instructions: [String!]!
  img: String
}
type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData
    recipes(category: String): [Recipe!]!
    getRecipe(_id: ID!): Recipe!
}
type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    createRecipe(recipeInput: RecipeInput): Recipe
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)
