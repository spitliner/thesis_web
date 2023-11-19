import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import * as uWebSockets from 'uWebSockets.js';
import * as socketIO from 'socket.io';

import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './socket/socketInterface.js';
import UserModel from './database/model/userModel.js';

const server = String(process.env.DB_PORT);
const databaseName = String(process.env.DB_NAME);

mongoose.connection.on("open", function() {
    //console.log(ref);
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    console.log(err);
});

mongoose.connect(`mongodb://${server}/${databaseName}`);

const express_server = express();
express_server.use(cors());
express_server.use(express.json());
express_server.use(express.urlencoded({ extended: true }));

const http_server = http.createServer(express_server);

const socket = new socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(http_server, {
    addTrailingSlash: false,
    cors: {
        origin: "localhost:3000"
    }
});

const uWebSocketApp = uWebSockets.App();
socket.attachApp(uWebSocketApp);

UserModel.getUser("00000000000").then(result => {
    console.log(result);
})

/*
socket.on("connection", (socket) => {
    console.log(socket);
});

http_server.listen(3000);
*/