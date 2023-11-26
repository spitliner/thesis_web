import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import GroupSchema from "../schema/groupSchema.js";
const GroupMongoModel = mongoose.model("Group", GroupSchema, "Groups");
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);
class GroupModel {
    static async getGroup(groupID) {
        return GroupMongoModel.findById(groupID).select("-__v");
    }
    static async findGroup(groupName) {
        return GroupMongoModel.find({
            $text: {
                $search: groupName
            },
            private: false
        }).select("-__v");
    }
    static async createGroup(groupName, isPrivate) {
        try {
            const groupID = uidGen();
            const result = await GroupMongoModel.insertMany([{
                    _id: groupID,
                    name: groupName,
                    private: isPrivate
                }]);
            console.log(result);
            return result[0];
        }
        catch (error) {
            console.log(error);
            return "0000";
        }
    }
    static async deleteGroup(groupID) {
        try {
            const result = await GroupMongoModel.deleteOne({
                _id: groupID
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async changeSearchAble(groupID, newSetting) {
        try {
            const result = await GroupMongoModel.updateOne({
                _id: groupID
            }, {
                private: newSetting
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
    static async changeSettings(groupID, newSetting) {
        try {
            const result = await GroupMongoModel.updateOne({
                _id: groupID
            }, {
                settings: newSetting
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
export default GroupModel;
