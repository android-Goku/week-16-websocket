import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets = [];

wss.on("connection", function(socket) {

    userCount++;
    console.log("User "+userCount+" connected");

    allSockets.push(socket)
    socket.on("message", (message) => {
        console.log("Message recieved " + message);
        //if(e.toString() === "ping"){
        //    socket.send('Server : ' + e.toString())
        //}
        allSockets.forEach(s => {
            s.send(message.toString() + " : server")
        });
    })

    //socket.on("disconnect", () =>)
});