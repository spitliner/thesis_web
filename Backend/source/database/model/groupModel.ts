import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import GroupSchema from "../schema/groupSchema.js";

const GroupMongoModel = mongoose.model("Group", GroupSchema, "Groups");

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);

class GroupModel {
    static async getGroup(groupID: string) {
        return GroupMongoModel.findById(groupID, "-__v -_id").exec();
    }

    static async getGroupData(groupID: string) {
        return GroupMongoModel.findById(groupID, "-__v -_id").lean().exec();
    }

    static async findGroup(groupName: string) {
        return GroupMongoModel.find({
            "$text": {
                "$search": groupName
            },
            private: false
        }, "-__v").lean().exec();
    }

    static async checkGroupID(groupID: string) {
        return 0 !== await GroupMongoModel.countDocuments({
            id: groupID
        }).lean().exec();
    }

    static async createGroup(groupName : string, isPrivate: boolean) {
        try {
            const groupID = uidGen();
            const result = await GroupMongoModel.insertMany([{
                id: groupID,
                name: groupName,
                private: isPrivate
            }]);
            return result[0];
        } catch (error) {
            console.log(error);
            return "0000";
        }
    }

    static async deleteGroup(groupID: string) {
        try {
            const result = await GroupMongoModel.deleteOne({
                id: groupID
            }).lean().exec();
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async changeGroupName(groupID: string, newName: string) {
        try {
            const group = await GroupModel.getGroup(groupID);
            if (null === group) {
                return false;
            }
            group.name = newName;
            await group.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeGroupSettings (groupID: string, newSettings: {[key: string]: unknown}) {
        try {
            const group = await GroupModel.getGroup(groupID);
            if (null === group) {
                return false;
            }
            group.settings = JSON.stringify(newSettings);
            await group.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default GroupModel;