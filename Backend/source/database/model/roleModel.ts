import mongoose from "mongoose";

import RoleSchema from "../schema/roleSchema.js";

const RoleMongoModel = mongoose.model("User", RoleSchema, "Users");

class RoleModel {
    static async getUserGroup(userID: string) {
        return RoleMongoModel.find({
            _id: {
                userID: userID
            }
        });
    }

    static async getGroupUser(groupID: string) {
        const result = await RoleMongoModel.find({
            _id: {
                groupID: groupID
            }
        });
        return result.map((doc) => {
            return {
                "id": doc._id.userID, 
                "nickname": doc.nickname,
                "role": doc.role
            }
        });
    }

    static async isJoinGroup(userID: string, groupID: string) {
        return 0 !== await RoleMongoModel.countDocuments({
            _id: {
                userID: userID,
                groupID: groupID
            }
        })
    }

    static async searchByNickname(nickname: string, groupID: string) {
        const result = await RoleMongoModel.find({
            _id: {
                groupID: groupID
            },
            nickname: {
                "$regex": nickname,
                "$option": 'i'
            }
        });
        return result.map((doc) => {
            return {
                "id": doc._id.userID,
                "nickname": doc.nickname
            }
        });
    }
}

export default RoleModel;