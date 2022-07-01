const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  firstName: {
    type: String,
    required: true,
    default: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    default: false,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    default: false,
    maxLength: 20,
    minLength: 8,
  }
})

// export User model for the users collection in mongoDB
module.exports = mongoose.model('User', userSchema)