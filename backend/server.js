const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')

const io = new Server(server, {
   cors: {
      origin: 'http://localhost:3000/',
      methods: [ "GET", "POST" ]
   },
   transports: ['websocket']
})

app.use(cors())

app.get('/', (req, res) => {
   res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
   console.log('User connected ' + socket.id)

   socket.on('ROOM:JOIN', (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined in room ${data}`)
   })

   socket.on('MESSAGE:SEND', (data) => {
      socket.to(data.room).emit('MESSAGE:RECEIVE', data)
   })

   socket.on('ROOM:DISCONNECT', () => {
      console.log('User disconnect', socket.id)
   })
})

server.listen(8000, () => {
   console.log('listening on *:8000')
})