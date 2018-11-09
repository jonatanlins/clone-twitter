const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(
  'mongodb://goweek:goweek123@ds155213.mlab.com:55213/goweek-4',
  { useNewUrlParser: true }
)

app.use((req, res, next) => {
  req.io = io
  return next()
})
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})