const http = require("http");
const SocketIO = require("socket.io");
const fs = require("fs");


module.exports = {

    loadSocket (){
        let app = http.createServer(() => {});

        const io = SocketIO(app);

        app.listen(8888, () =>{
            console.log('open on 8888');
        });

        return io;
    }


}

function loadSocketIO() {
    let app = http.createServer(() => {});

    const io = SocketIO(app);

    app.listen(8888, () =>{
        console.log('open on 8888');
    });

    return io;
}
