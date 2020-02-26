let imageDb = require('./image-model')

const getImageNames = async (name) => {
  if (name) {
    return imageDb.findOne({ name }, { __v: false })
  } else {
    return imageDb.find({}, { __v: false })
  }
}

const addImageName = async (name, location) => {
  return imageDb.insertMany({ name, location })
    .catch(err => {
      console.log(err)
      return err
    })
}
module.exports = { getImageNames, addImageName }
