import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';

import UserSchema from "../schema/userSchema.js";

const UserMongoModel = mongoose.model("User", UserSchema, "Users");

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);

const defaultSettings = {
    "darkMode" : false,
    "searchable": true,
    "chatStranger": false
};

class UserModel {
    static async searchUser(userEmail: string) {
        return UserMongoModel.findOne({email: userEmail}).select("-__v").lean().exec();
    }

    static async getUser(userID: string) {
        return UserMongoModel.findById(userID).select("-__v").lean().exec();
    }

    static async getUserSafe(userID: string) {
        return UserMongoModel.findById(userID).select("-__v -password -oauth").lean().exec();
    }

    static async checkID(userID: string) {
        const result = 0 !== await UserMongoModel.countDocuments({
            _id: userID
        });
        return result;
    }

    static async checkEmail(userEmail: string) {
        const result = 0 !== await UserMongoModel.countDocuments({
            email: userEmail
        })
        return result;
    }

    static async changeEmail(userID: string, newEmail: string) {
        try {
            const result = await UserMongoModel.updateOne({
                _id: userID
            }, {
                email: newEmail
            }).exec();
            return {
                "docFound": 1 === result.matchedCount,
                "docModified": 1 === result.modifiedCount
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "database error"
            };
        }
    }

    static async changePassword(userID: string, newHashedPassword: string) {
        try {
            const result = await UserMongoModel.updateOne({
                _id: userID
            }, {
                password: newHashedPassword
            }).exec();
            return {
                "docFound": 1 === result.matchedCount,
                "docModified": 1 === result.modifiedCount
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "database error"
            };
        }
    }

    static async changeSettings(userID: string, newSetting: {[key: string] : unknown}) {
        try {
            const result = await UserMongoModel.updateOne({
                _id: userID
            }, {
                settings: String(newSetting)
            }).exec();
            return {
                "docFound": 1 === result.matchedCount,
                "docModified": 1 === result.modifiedCount
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "database error"
            };
        }
    }

    static async insertUser(username: string, hashPassword: string, email: string) {
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
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async deleteUser(userID: string) {
        try {
            const result = await UserMongoModel.deleteOne({
                _id: userID
            }).lean().exec();
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default UserModel;