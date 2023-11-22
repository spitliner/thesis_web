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

    static async setSetting(userID: string, newVal : {[key: string] : unknown}) {
        const result = await UserModel.setSetting(userID, newVal);
        return result;
    }

    static async login(email: string, password : string) {
        const usr = await UserModel.searchUser(email);
        if (1 === usr.length) {
            if (await Authentication.verifyPassword(password, String(usr[0].password))) {
                return {
                    "token" : await Authentication.createTokenJose({"uid": usr[0]._id}),
                    "username": usr[0].username
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

    static async findUser(nickname: string, groupID: string) {
        return RoleModel.searchByNickname(nickname, groupID);
    }

    static async getJoinedGroup(userID: string) {
        return RoleModel.getGroupUser(userID);
    }
}

export default UserController