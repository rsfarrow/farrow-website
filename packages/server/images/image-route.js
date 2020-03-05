const express = require('express')
const AWS = require('aws-sdk')

const router = express.Router()
const imageDb = require('./image-repository')
const MAX_FILE_SIZE = 1048576 // 1 MB

AWS.config.region = 'us-east-1'
let s3 = new AWS.S3()
const BUCKET_NAME = 'farrow-website'
const BASE64 = 'base64'

router.post('/upload', async (req, res) => {
  if (!req.body.img || !req.body.name || !req.body.size) {
    res.status(200).send({ success: false, message: 'img, name, size are all required' })
  }
  const resp = await uploadFile(req.body.img, req.body.name, req.body.size)
  res.status(200).send(resp)
})

router.post('/image-name-validation', async (req, res) => {
  const exists = await imageDb.getImageNames(req.body.name)
  res.status(200).send({ success: !exists, message: exists ? 'File name exists' : '' })
})

const uploadFile = async (file, name, size) => {
  // Do my own validation again just in case someone tries to hit the api itself
  if (size > MAX_FILE_SIZE) {
    return { success: false, message: 'Size too large' }
  }
  const exists = await imageDb.getImageNames(name)
  if (!exists) {
    let fileSplit = file.split(';')
    let type = fileSplit[0].substring(5) // peel off the type
    let data = fileSplit[1].split(',')[1] // peel off the content
    let buf = Buffer.from(data, BASE64)
    let params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Body: buf,
      ContentEncoding: BASE64,
      ContentType: type
    }
    let response = await s3.upload(params).promise()
    if (response) {
      await imageDb.addImageName(name, response.Location)
      return { success: true, location: response.Location }
    } else {
      return { success: false }
    }
  } else {
    return { success: false, message: 'File name exists' }
  }
}

module.exports = router
