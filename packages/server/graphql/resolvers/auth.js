const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports = {
  createUser: async (args) => {
    try {
      const userDb = await User.findOne({ email: args.userInput.email })
      if (userDb) {
        throw new Error('User exists already.')
      }
      const hashedPass = await bcrypt.hash(args.userInput.password, 12)
      // Create new user
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPass
      })
      const result = await newUser.save()
      return { ...result._doc, password: null }
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('User does not exist!')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Incorect Password!')
    }
    const token = await jwt.sign({ userId: user.id, email: user.email }, 'somesupersecretkey', {
      expiresIn: '1h'
    })
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
}
