import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import socket from './socket/initSocket.js';
import http_server from './webServer/initServer.js';
import testDB from './test/testDB.js';
//----
const server = String(process.env.DB_PORT);
const databaseName = String(process.env.DB_NAME);
mongoose.connection.on("open", function () {
    //console.log(ref);
    console.log("Connected to mongo server.");
});
mongoose.connection.on("error", function (error) {
    console.log("Could not connect to mongo server!");
    console.log(error);
});
mongoose.connect(`mongodb://${server}/${databaseName}`);
//----
socket.on("connection", (socket) => {
    console.log(socket);
});
http_server.listen(3000);
testDB.addData("174", "114").then((result) => {
    delete result[0];
    console.log(result[0]);
});
