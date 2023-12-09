import mongoose from "mongoose";

import RoleSchema from "../schema/roleSchema.js";
import UserModel from "./userModel.js";
import GroupModel from "./groupModel.js";

const RoleMongoModel = mongoose.model("User", RoleSchema, "Users");

class RoleModel {
    static async getUserRole(userID: string, groupID: string) {
        return RoleMongoModel.findById({
            userID: userID,
            groupID: groupID
        }, "-__v").exec();
    }

    static async getUserGroup(userID: string) {
        return RoleMongoModel.find({
            userID: userID
        }, "-__v").lean().exec();
    }

    static async getGroupUser(groupID: string) {
        const result = await RoleMongoModel.find({
            groupID: groupID
        }).select("-_id -allowChannel").lean().exec();
        return result;
    }

    static async isJoinGroup(userID: string, groupID: string) {
        return 0 !== await RoleMongoModel.countDocuments({
            userID: userID,
            groupID: groupID
        });
    }

    static async addUserToGroup(userID: string, groupID: string) {
        try {
            const usr = await UserModel.getUserSafe(userID);
            if (null === usr) {
                return {
                    code: 1,
                    error: "User not found"
                }
            } else if (false === await GroupModel.checkGroupID(groupID)) {
                return {
                    code: 2,
                    error: "Group not found"
                }
            }
            return RoleMongoModel.insertMany([{
                userID: userID,
                groupID: groupID,
    
            }])
        } catch (error) {
            console.log(error);
            return {
                code: 4,
                error: "Database error"
            };
        }
        
        
    }
}

export default RoleModel;