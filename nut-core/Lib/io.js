const http = require("http");
const SocketIO = require("socket.io");
const fs = require("fs");


module.exports = (app) => {

    const io = SocketIO({
        path : "/",
        serveClient : false
    })

    let ioServer = http.createServer(() => {});

    io.attach(ioServer, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    })

    ioServer.listen(8888, () =>{
        console.log('The Socket Service has started on port ', ioServer.address().port);
    });

    app.io = io;
}
