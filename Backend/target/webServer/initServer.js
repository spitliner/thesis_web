import cors from "cors";
import http from 'http';
import express from "express";
const express_server = express();
express_server.use(cors());
express_server.use(express.json());
express_server.use(express.urlencoded({ extended: true }));
const http_server = http.createServer(express_server);
export default http_server;
