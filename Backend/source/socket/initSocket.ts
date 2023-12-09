import * as uWebSockets from 'uWebSockets.js';
import * as socketIO from 'socket.io';

import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./socketInterface.js";
import UserController from '../controller/userController.js';
import MessageController from '../controller/messageController.js';

const serverSocket = new socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
    addTrailingSlash: false,
    cors: {
        origin: [
            "localhost:8080",
            "localhost:9000"
        ]
    },
    connectionStateRecovery: {}
});

const UserSocketIDarray :  {[key: string] : {socketID: string[], joinGroup: string[], joinMod: string[], joinAdmin: string[], currentChannel: string}}  = {};
const SocketIDtoUser : {[key: string] : string} = {};

type ServerSocketType = socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

const uWebSocketApp = uWebSockets.App();
serverSocket.attachApp(uWebSocketApp);

/*
socket.engine.on("initial_headers", (headers, request) => {

});
*/

serverSocket.engine.on("connection_error", (error) => {
    console.log(error.req);      // the request object
    console.log(error.code);     // the error code, for example 1
    console.log(error.message);  // the error message, for example "Session ID unknown"
    console.log(error.context);  // some additional error context
});


serverSocket.on("new_namespace", namespace => {
    console.log(namespace.name);
});

serverSocket.on("connection", async socket => {
    const uid: string = socket.handshake.auth.uid;
    SocketIDtoUser[socket.id] = uid;
    if (undefined === UserSocketIDarray[uid]) {
        UserSocketIDarray[uid] = {
            socketID: [],
            joinGroup: [],
            joinMod: [],
            joinAdmin: [],
            currentChannel: ""
        };
    }
    UserSocketIDarray[uid].socketID.push(socket.id);

    //Join Group
    const joinedGroup = await UserController.getJoinedGroup(uid);
    joinedGroup.forEach(group => {
        socket.join(group.groupID);
        //socket.join(group.allowChannel);

        if ("admin" === group.role) {
            socket.join(group.groupID + "|admin");
            UserSocketIDarray[uid].joinAdmin.push(group.groupID);
        } else if ("mod" === group.role) {
            socket.join(group.groupID + "|mod");
            UserSocketIDarray[uid].joinMod.push(group.groupID);
        }
    });

    const searchResult = await UserController.getUser(uid);
    if (true === searchResult.result && undefined !== searchResult.user?.friends) {
        const friendList: {[key: string] : string} = JSON.parse(searchResult.user.friends);
        for (const key in friendList) {
            socket.join(friendList[key]);
        }
    }

    socket.on("chat_new", async (channelID, content) => {
        if (undefined === channelID || undefined === content) {
            socket.emit("server_error", {"error": "missing arg"});
        } else if (typeof(channelID) !== 'string' || typeof(content) !== 'string') {
            socket.emit("server_error", {"error": "arg wrong type"});
        }
        const message = await MessageController.addMessage(uid, channelID, "text", content);
        if (null !== message) {
            socket.broadcast.emit("chat_sync", message);
        }
    });

    if (!socket.recovered) {
        socket.emit("chat_get", await MessageController.getMessageInChannel())
    }
    
    socket.on("disconnect", () => {
        delete SocketIDtoUser[socket.id];
        delete UserSocketIDarray[uid][socket.id];

        
    })
});

export { serverSocket, uWebSocketApp, ServerSocketType };