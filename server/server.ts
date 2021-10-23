// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
const express = require('express');

const app = express();
const http = require('http');
const compression = require('compression');
// const config = require('./webpack.config');
// const app = new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// });
const server = http.Server(app)
const io = require('socket.io')(server)
const Boggle = require('solve-boggle')
const path = require('path')

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
app.use(express.static(path.join(__dirname, './../')));

const port = process.env.PORT || 3000
server.listen(port, console.log.bind(console, `listening at http://localhost:${port}`))
