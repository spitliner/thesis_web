import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import GroupSchema from "../schema/groupSchema.js";

const GroupMongoModel = mongoose.model("Group", GroupSchema, "Groups");

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);

class GroupModel {
    static async getGroup(groupID: string) {
        return GroupMongoModel.findById(groupID).select("-__v");
    }

    static async findGroup(groupName: string) {
        return GroupMongoModel.find({
            $text: {
                $search: groupName
            },
            private: false
        }).select("-__v");
    }

    static async createGroup(groupName : string, isPrivate: boolean) {
        try {
            const groupID = uidGen();
            const result = await GroupMongoModel.insertMany([{
                _id: groupID,
                name: groupName,
                private: isPrivate
            }]);
            console.log(result);
            return result[0];
        } catch (error) {
            console.log(error);
            return "0000";
        }
    }

    static async deleteGroup(groupID: string) {
        try {
            const result = await GroupMongoModel.deleteOne({
                _id: groupID
            });
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async changeSearchAble(groupID: string, newSetting : boolean) {
        try {
            const result = await GroupMongoModel.findOneAndUpdate(
                {
                    _id: groupID
                }, {
                    private: newSetting
                }, {
                    "new": true
                }).select("-__v");
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async changeSettings(groupID: string, newSetting : boolean) {
        try {
            const result = await GroupMongoModel.findOneAndUpdate(
                {
                    _id: groupID
                }, {
                    settings: newSetting
                }, {
                    "new": true
                }).select("-__v");
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default GroupModel;