var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('user connected');
    if (socket)
        console.log('got a socket');

    socket.on("initialized", function() {
        console.log('init');
    });

    socket.on('x', function(msg) {
        console.log('message: ' + msg.msg);
        io.emit('x', msg);
    });

    socket.on('disconnect', function() {
        console.log('disconnecting');
    });
});