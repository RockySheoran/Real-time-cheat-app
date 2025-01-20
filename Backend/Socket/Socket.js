import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://chat-app1-fx7t.onrender.com',
        // origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        // credentials: true,
    },
});


const userSocketMap = {}; // {userId->socketId}
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}


io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }
    // console.log(userSocketMap)
    // console.log(userId)

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })

})

export { app, io, server };
