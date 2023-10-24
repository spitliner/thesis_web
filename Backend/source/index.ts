require("dotenv").config();
import express from 'express';
import http from 'http';
import * as uWebSockets from 'uWebSockets.js';
import * as io from 'socket.io';


const express_server = express()
express_server.use(express.json());
express_server.use(express.urlencoded({ extended: true }));
const http_server = http.createServer(express_server);
const socket = new io.Server(http_server);

const app = uWebSockets.App();
socket.attachApp(app);



