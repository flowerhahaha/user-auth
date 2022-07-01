const mongoose = require('mongoose')
const Schema = mongoose.Schema
const stringType = {
  type: String,
  required: true,
  default: false,
  trim: true
}

const userSchema = new Schema ({
  firstName: stringType,
  email: {
    type: String,
    required: true,
    default: false,
    unique: true,
    trim: true
  },
  password: stringType
})

// export User model for the users collection in mongoDB
module.exports = mongoose.model('User', userSchema)