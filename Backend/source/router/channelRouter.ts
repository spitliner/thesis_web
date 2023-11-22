import express from 'express';

const ChannelRouter = express.Router();

ChannelRouter.get("", (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({"error": "Unexpected error"});
    }
});

export default ChannelRouter;