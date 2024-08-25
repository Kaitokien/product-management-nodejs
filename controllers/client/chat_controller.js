// [GET] /chat
module.exports.index = (req, res) => {
  // SocketIO
  _io.on('connection', (socket) => {
    console.log('A user connected', socket.id)
  })
  res.render('client/pages/chat/index', {
    pageTitle: "Chat"
  })
}