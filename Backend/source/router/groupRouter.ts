import express from 'express';

const GroupRouter = express.Router();

GroupRouter.put('/creation', (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({error: "Unexpected server error"});
    }
});

GroupRouter.get('/settings', (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({error: "Unexpected server error"});
    }
});

GroupRouter.post('/settings', (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({error: "Unexpected server error"});
    }
});

export default GroupRouter;