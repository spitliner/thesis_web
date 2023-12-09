import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

//---

const express_server = express();
express_server.use(cors());
express_server.use(cookieParser());
express_server.use(express.json());
express_server.use(express.urlencoded({ extended: true }));

express_server.get('*', (request, response) => {
    return response.status(404).json({"error": "unknown request"});
});

//---

export default express_server;