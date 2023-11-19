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
        return RoleMongoModel.find({
            _id: {
                groupID: groupID
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
        
    }
}

export default RoleModel;