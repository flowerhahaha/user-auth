// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const app = express()

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set middleware 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// router: get homepage
app.get('/', (req, res) => {
  res.render('index')
})

// router: get login page
app.get('/users/login', (req, res) => {
  res.render('login')
})

// start and listen on the express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})