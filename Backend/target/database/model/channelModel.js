import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import ChannelSchema from "../schema/channelSchema.js";
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 16);
const ChannelMongoModel = mongoose.model("Channel", ChannelSchema, "Channels");
class ChannelModel {
    static async createChannel(groupID, channelName) {
        try {
            const channelID = uidGen();
            const result = await ChannelMongoModel.insertMany([
                {
                    _id: channelID,
                    groupID: groupID,
                    name: channelName
                }
            ]);
            console.log(result);
            return channelID;
        }
        catch (error) {
            console.log(error);
            return "0000";
        }
    }
    static async deleteChannel(groupID, channelID) {
        try {
            const result = await ChannelMongoModel.deleteOne({
                _id: channelID,
                groupID: groupID
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async deleteGroupChannel(groupID) {
        try {
            const result = await ChannelMongoModel.deleteMany({
                groupID: groupID
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async saveChannelSetting(channelID, settings) {
        try {
            const result = await ChannelMongoModel.updateOne({
                _id: channelID
            }, {
                settings: String(settings)
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async changeChannelName(channelID, newName) {
        try {
            const result = await ChannelMongoModel.updateOne({
                _id: channelID
            }, {
                name: newName
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
export default ChannelModel;
