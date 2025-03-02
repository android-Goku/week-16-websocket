import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const server = createServer(app); // Create HTTP server
const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ server });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", function (socket) {
    userCount++;
    console.log("User " + userCount + " connected");

    allSockets.push(socket);

    socket.on("message", (message) => {
        console.log("Message received: " + message);

        // Broadcast message to all clients
        allSockets.forEach(s => {
            if (s.readyState === s.OPEN) {
                s.send(`${message} : server`);
            }
        });
    });

    socket.on("close", () => {
        console.log("User disconnected");
        allSockets = allSockets.filter(s => s !== socket);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*
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
*/