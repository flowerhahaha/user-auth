// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const User = require('./models/user')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set middleware 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGN_COOKIE))
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

// router: get homepage
app.get('/', (req, res) => {
  const { userId } = req.signedCookies
  if (req.session[userId] !== 'isVerified') return res.render('index') 
  User.findById(userId)
    .then(result => {
      if (!result) return res.render('index')
      const { firstName } = result
      res.render('index', { firstName })
    })
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
    // if valid email and correct password
    res.cookie('userId', userData._id, { signed: true })
    req.session[userData._id] = 'isVerified'
    res.redirect('/')
  } catch (e) {
    // async 500 error should be caught and passed to error handler by next(e)
    next(e)
  }
})

// router: post from /users/logout
app.post('/users/logout', (req, res) => {
  const { userId } = req.signedCookies
  req.session[userId] = 'notVerified'
  res.clearCookie('userId')
  res.redirect('/')
})

// router: get 404 error page
app.get('*', (req, res) => {
  const errMessage = 'The requested URL was not found on this server!'
  res.status(404).render('error', { errMessage })
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