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
        return UserMongoModel.findOne({email: userEmail}, "-__v").exec();
    }

    static async getUser(userID: string) {
        return UserMongoModel.findById(userID, "-__v").exec();
    }

    static async getUserSafe(userID: string) {
        return UserMongoModel.findById(userID, "-__v -password -oauth").lean().exec();
    }

    static async getUserData(userID: string) {
        return UserMongoModel.findById(userID, "-__v").lean().exec();
    }

    static async checkID(userID: string) {  
        return 0 !== await UserMongoModel.countDocuments({
            _id: userID
        }).lean().exec();
    }

    static async checkEmail(userEmail: string) {
        return 0 !== await UserMongoModel.countDocuments({
            email: userEmail
        }).exec();
    }

    static async insertUser(username: string, hashPassword: string, email: string) {
        try {
            const result = await UserMongoModel.insertMany([{
                id: uidGen(),
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

    static async changeSetting(userID: string, newSetting: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.settings = newSetting;
            await user.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeEmail(userID: string, newmail: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.email = newmail;
            await user.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changePassword(userID: string, newPass: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.password = newPass;
            await user.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async updateLastOnline(userID: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.updateOne({lastOnline: new Date()})
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async addFriend(userID: string, friendID: string, channelID: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            let friendList : {[key:string] :string} = {};
            if (undefined !== user.friends) {
                friendList = JSON.parse(user.friends);
            }
            friendList[friendID] = channelID;
            user.friends = JSON.stringify(friendList);
            await user.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default UserModel;