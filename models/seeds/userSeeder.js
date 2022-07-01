const User = require('../user')
const db = require('../../config/mongoose')

const users = [
 {
   firstName: 'Tony',
   email: 'tony@stark.com',
   password: 'iamironman1'
 },
 {
   firstName: 'Steve',
   email: 'captain@hotmail.com',
   password: 'icandothisallday1'
 },
 {
   firstName: 'Peter',
   email: 'peter@parker.com',
   password: 'enajyram1'
 },
 {
   firstName: 'Natasha',
   email: 'natasha@gamil.com',
   password: '*parol#@$!1'
 },
 {
   firstName: 'Nick',
   email: 'nick@shield.com',
   password: 'password1'
 }
]

db.once('open', () => {
  User.create(users)
    .then(() => console.log('The user seed has been created.'))
    .catch(e => console.log(e))
})