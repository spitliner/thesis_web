import RoleModel from "../database/model/roleModel.js";
import UserModel from "../database/model/userModel.js";
import Authentication from "./authentication.js";
class UserController {
    static async getUser(userID) {
        const usr = await UserModel.getUser(userID);
        if (null === usr) {
            return {
                "result": false,
                "error": "user not found"
            };
        }
        return {
            "result": true,
            "user": usr
        };
    }
    static async setSetting(userID, newVal) {
        const result = await UserModel.setSetting(userID, newVal);
        return result;
    }
    static async login(email, password) {
        const usr = await UserModel.searchUser(email);
        if (null !== usr) {
            if (await Authentication.verifyPassword(password, String(usr.password))) {
                return {
                    "token": await Authentication.createTokenJose({ "uid": usr._id }),
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
    static async getJoinedGroup(userID) {
        return RoleModel.getGroupUser(userID);
    }
}
export default UserController;
