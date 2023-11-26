import mongoose from "mongoose";
import RoleSchema from "../schema/roleSchema.js";
const RoleMongoModel = mongoose.model("User", RoleSchema, "Users");
class RoleModel {
    static async getUserGroup(userID) {
        return RoleMongoModel.find({
            _id: {
                userID: userID
            }
        }).select("-__v");
    }
    static async getGroupUser(groupID) {
        const result = await RoleMongoModel.find({
            _id: {
                groupID: groupID
            }
        }).select("_id role, nickname");
        return result;
    }
    static async isJoinGroup(userID, groupID) {
        return 0 !== await RoleMongoModel.countDocuments({
            _id: {
                userID: userID,
                groupID: groupID
            }
        });
    }
    static async changeNickname(userID, groupID, newNickname) {
        try {
            const result = await RoleMongoModel.updateOne({
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
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async changeRole(userID, groupID, newRole) {
        try {
            const result = await RoleMongoModel.updateOne({
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
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async changeChannelAllow(userID, groupID, newAllow) {
        try {
            const result = await RoleMongoModel.updateOne({
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
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
export default RoleModel;
