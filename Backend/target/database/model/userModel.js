import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import UserSchema from "../schema/userSchema.js";
const UserMongoModel = mongoose.model("User", UserSchema, "Users");
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);
const defaultSettings = {
    "darkMode": false,
    "searchable": true,
    "chatStranger": false
};
class UserModel {
    static async searchUser(userEmail) {
        return UserMongoModel.findOne({ email: userEmail });
    }
    static async getUser(userID) {
        return UserMongoModel.findById(userID);
    }
    static async checkID(userID) {
        const result = 0 !== await UserMongoModel.countDocuments({
            _id: userID
        });
        return result;
    }
    static async checkEmail(userEmail) {
        const result = 0 !== await UserMongoModel.countDocuments({
            email: userEmail
        });
        return result;
    }
    static async changeEmail(userID, newEmail) {
        try {
            const result = await UserMongoModel.updateOne({
                _id: userID
            }, {
                email: newEmail
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async setSetting(userID, newSetting) {
        try {
            const result = await UserMongoModel.updateOne({
                _id: userID
            }, {
                settings: String(newSetting)
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async insertUser(username, hashPassword, email) {
        try {
            const result = await UserMongoModel.insertMany([{
                    _id: uidGen(),
                    username: username,
                    password: hashPassword,
                    email: email,
                    settings: String(defaultSettings)
                }]);
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async deleteUser(userID) {
        try {
            const result = await UserMongoModel.deleteOne({
                _id: userID
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
export default UserModel;
