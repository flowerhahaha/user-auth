// packages and variables
const express = require('express')
const app = express()

// router: get homepage
app.get('/', (req, res) => {
  res.send('This is homepage')
})

// start and listen on the express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})