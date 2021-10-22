/* eslint-disable no-var, strict */
// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var express = require('express');

var app = express();
var http = require('http');
var compression = require('compression');
// var config = require('./webpack.config');
// var app = new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// });
var server = http.Server(app)
var io = require('socket.io')(server)
var Boggle = require('solve-boggle')

io.on('connection', (socket) => {
  socket.on('error', (err) => {
    console.error(err)
    socket.disconnect()
  })
  socket.on('start', (data) => {
    if (socket.room && data.startOtherPlayersGames) {
      socket.to(socket.room).broadcast.emit('startGame')
    }
    socket.boggle = new Boggle(data.letters ? data.letters : 5)
    socket.emit('letters', socket.boggle.board.flat())
    socket.boggle.solve((words) => {
      socket.emit('solution', words)
    })
  })
  socket.on('join', (room) => {
    socket.room = room
    socket.join(room)
  })
})

app.use(compression())
app.use(express.static(__dirname))

const port = process.env.PORT || 3000
server.listen(port, console.log.bind(console, `listening at http://localhost:${port}`))
