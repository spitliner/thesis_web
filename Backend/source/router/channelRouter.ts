import express from 'express';

const ChannelRouter = express.Router();

ChannelRouter.get("", (request, response) => {
    try {
        response.cookie("uid", "");
        response.cookie("username", "");
    } catch (err) {
        
    }
});

ChannelRouter.put("", (request, response) => {
    try {
        
    } catch (err) {
        
    }
});

ChannelRouter.post("/settings", (request, response) => {
    try {
        
    } catch (err) {
        
    }
});

export default ChannelRouter;