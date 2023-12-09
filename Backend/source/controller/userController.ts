import RoleModel from "../database/model/roleModel.js";
import UserModel from "../database/model/userModel.js";
import Authentication from "./authentication.js";

class UserController {
    static async getUser(userID: string) {
        const usr = await UserModel.getUser(userID);
        if (null === usr) {
            return {
                "result": false,
                "error": "user not found"
            }
        }
        return {
            "result": true,
            "user": usr
        }
    }

    static async setSetting(userID: string, newSettings : {[key: string] : unknown}) {
        try {
            const usr = await UserModel.getUser(userID);
            if (null === usr) {
                return false;
            }
            usr.settings = JSON.stringify(newSettings);
            await usr.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async login(email: string, password : string) {
        const usr = await UserModel.searchUser(email);
        if (null !== usr) {
            if (await Authentication.verifyPassword(password, String(usr.password))) {
                return {
                    "token" : await Authentication.createTokenJose({"uid": usr._id}),
                    "username": usr.username
                };
            }
            return {
                "error": "wrong password"
            };
        }
        return {
            "error": "user not found"
        };   
    }

    static async getJoinedGroup(userID: string) {
        return RoleModel.getUserGroup(userID);
    }

    static async getUserRoleInGroup(userID: string, groupID: string) {
        return RoleModel.getUserRole(userID, groupID);
    }
}

export default UserController