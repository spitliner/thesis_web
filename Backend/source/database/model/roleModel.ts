import mongoose from "mongoose";

import RoleSchema from "../schema/roleSchema.js";

const RoleMongoModel = mongoose.model("User", RoleSchema, "Users");

class RoleModel {
    static async getUserGroup(userID: string) {
        return RoleMongoModel.find({
            _id: {
                userID: userID
            }
        }).select("-__v");
    }

    static async getGroupUser(groupID: string) {
        const result = await RoleMongoModel.find({
            _id: {
                groupID: groupID
            }
        }).select("_id role, nickname");
        return result;
    }

    static async isJoinGroup(userID: string, groupID: string) {
        return 0 !== await RoleMongoModel.countDocuments({
            _id: {
                userID: userID,
                groupID: groupID
            }
        })
    }

    static async changeNickname(userID: string, groupID: string, newNickname: string) {
        try {
            const result = await RoleMongoModel.updateOne(
                {
                    _id: {
                        userID: userID,
                        groupID: groupID
                    }
                }, {
                    nickname: newNickname
                }, {
                    "new": true
                });
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async changeRole(userID: string, groupID: string, newRole: string) {
        try {
            const result = await RoleMongoModel.updateOne(
                {
                    _id: {
                        userID: userID,
                        groupID: groupID
                    }
                }, {
                    role: newRole
                }, {
                    "new": true
                });
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async changeChannelAllow(userID: string, groupID: string, newAllow: string[]) {
        try {
            const result = await RoleMongoModel.updateOne(
                {
                    _id: {
                        userID: userID,
                        groupID: groupID
                    }
                }, {
                    allowChannel: newAllow
                }, {
                    "new": true
                });
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default RoleModel;