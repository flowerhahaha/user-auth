// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const User = require('./models/user')
const cookieParser = require('cookie-parser')
const app = express()

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set middleware 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// router: get homepage
app.get('/', (req, res) => {
  res.render('index')
})

// router: get login page
app.get('/users/login', (req, res) => {
  res.render('login')
})

// router: post from /users/login
app.post('/users/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const userData = await User.findOne({ email }).lean()
    // if email doesn't exist
    if (!userData) {
      const notFoundEmail = true
      return res.render('login', { notFoundEmail, email })
    }
    // if password is incorrect
    if (userData.password !== password) {
      const notFoundPassword = true
      return res.render('login', { notFoundPassword, email })
    }
    // valid email and correct password
    res.redirect(`/${userData.firstName}`)
  } catch (e) {
    // async 500 error should be caught and passed to error handler by next(e)
    next(e)
  }
})

// router: get user homepage
app.get('/:firstName', (req, res) => {
  const { firstName } = req.params
  User.exists({ firstName })
    .then(result => {
      const errMessage = 'The requested URL was not found on this server!'
      result ? res.render('index', { firstName }) : res.render('error', { errMessage })
    })
})

// error handling: catch error from server side
app.use((err, req, res, next) => {
  const errMessage = 'Sorry! Server is broken. We will fix it soon.'
  console.log(err)
  res.status(500).render('error', { errMessage })
})

// start and listen on the express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})