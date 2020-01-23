
const DataLoader = require('dataloader')
const { dateToString } = require('../helpers/common')
const Event = require('../../models/event')
const User = require('../../models/user')
const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds)
})
const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } })
})

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId)
    return {
      ...user._doc,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
}

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    events.sort((a, b) => {
      return eventIds.indexOf(a._id.toString() - b._id.toString())
    })
    return events.map(event => {
      return transformEvent(event)
    })
  } catch (err) {
    throw err
  }
}

const singleEvent = async (eventId) => {
  try {
    const retrievedEvent = await eventLoader.load(eventId)
    return retrievedEvent
  } catch (err) {
    throw err
  }
}

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)

  }
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: userLoader.load.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event)
  }
}

// TODO: Add users, comments, ratings, nutrients, etc
const transformRecipe = recipe => {
  return {
    ...recipe._doc,
    createdAt: recipe._doc.createdAt,
    updatedAt: recipe._doc.updatedAt
  }
}

exports.user = user
exports.events = events
exports.singleEvent = singleEvent
exports.transformEvent = transformEvent
exports.transformBooking = transformBooking
exports.transformRecipe = transformRecipe
