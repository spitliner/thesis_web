import * as uWebSockets from 'uWebSockets.js';
import * as socketIO from 'socket.io';

import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./socketInterface.js";
import http_server from '../webServer/initServer.js';


const socket = new socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(http_server, {
    addTrailingSlash: false,
    cors: {
        origin: "localhost:3000"
    }
});

const uWebSocketApp = uWebSockets.App();
socket.attachApp(uWebSocketApp);

socket.engine.on("initial_headers", (headers, request) => {
    headers["test"] = "123";
    headers["set-cookie"] = "mycookie=456";
});

socket.engine.on("connection_error", (error) => {
    console.log(error.req);      // the request object
    console.log(error.code);     // the error code, for example 1
    console.log(error.message);  // the error message, for example "Session ID unknown"
    console.log(error.context);  // some additional error context
});

export default socket;