import express from 'express';

import UserController from '../controller/userController.js';

const UserRouter = express.Router();

UserRouter.post("/login", async (request, response) => {
    try {
        const {email, password} = request.body;
        if (undefined === email) {
            return response.status(400).json({"error" : "missing user email"});
        }
        else if (undefined === password) {
            return response.status(400).json({"error" : "missing user password"});
        }
        const token = await UserController.login(email, password);
        response.cookie("uid", "");
        response.cookie("username", "");
        return response.status(200).json({"token": token});
    } catch (error) {
        console.log(error);
        return response.status(500).json({"error": "server error"});
    }
});

UserRouter.get("/self/", async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({"error": "unexpected server error"});
    }
});

UserRouter.get("/self/settings", async (request, response) => {
    try {
        //return response.status(200).json(await UserController.getUser(""));
        const result = await UserController.getUser("");
        if (null === result) {
            return response.status(400).json({"error": "user not found"});
        }
        return response.status(200).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({"error": "unexpected server error"});
    }
});

UserRouter.post("/self/settings", async (request, response) => {
    try {
        if (undefined === request.body.settings) {
            return response.status(400)
        }
        const result = await UserController.setSetting(request.cookies['uid'], request.body.settings);
    } catch (error) {
        console.log(error);
        return response.status(500).json({"error": "sunexpected server error"})
    }
});


UserRouter.post("/self/password", async (request, response) => {
    try {
        if (undefined === request.body.settings) {
            return response.status(400)
        }
        const result = await UserController.setSetting(request.cookies['uid'], request.body.settings);
    } catch (error) {
        console.log(error);
        return response.status(500).json({"error": "sunexpected server error"})
    }
});

export default UserRouter;