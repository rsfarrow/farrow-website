const { dateToString } = require('../helpers/common')
const { transformEvent } = require('./merge')
const Event = require('../../models/event')
const User = require('../../models/user')

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    const event = new Event({
      creator: req.userId,
      title: args.eventInput.title,
      desc: args.eventInput.desc,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date)
    })
    let createdEvent
    try {
      const result = await event.save()
      createdEvent = transformEvent(result)
      const creator = await User.findById(req.userId)
      if (!creator) {
        throw new Error('User not found')
      }
      creator.createdEvents.push(event)
      await creator.save()
      return createdEvent
    } catch (err) {
      throw err
    }
  }
}
