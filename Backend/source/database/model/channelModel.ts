import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import ChannelSchema from "../schema/channelSchema.js";


const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 16);

const ChannelMongoModel = mongoose.model("Channel", ChannelSchema, "Channels");

class ChannelModel {
    static async getChannel(channelID: string) {
        return ChannelMongoModel.findOne({
            id: channelID,

        }, "-__v -_id").exec();
    }

    static async getChannelData(channelID: string) {
        return ChannelMongoModel.findOne({
            id: channelID,

        }, "-__v -_id").lean().exec();
    }

    static async createChannel(groupID: string, channelName: string) {
        try {
            const result = await ChannelMongoModel.insertMany([
                {
                    id: uidGen(),
                    groupID: groupID,
                    name: channelName
                }
            ]);
            //console.log(result);
            return result[0];
        } catch (error) {
            console.log(error);
            return "0000";
        }
    }

    static async deleteChannel(groupID: string, channelID: string) {
        try {
            const result = await ChannelMongoModel.deleteOne({
                id: channelID,
                groupID: groupID
            }).lean().exec();
            console.log("Delete " + result.deletedCount + " channel");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async deleteGroupChannel(groupID: string) {
        try {
            const result = await ChannelMongoModel.deleteMany({
                groupID: groupID
            }).lean().exec();
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async saveChannelSetting(channelID: string, newSettings: {[key: string]: unknown}) {
        try {
            const channel = await ChannelModel.getChannel(channelID);
            if (null === channel) {
                return false;
            }
            channel.settings = JSON.stringify(newSettings);
            await channel.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeChannelName(channelID: string, newName: string) {
        try {
            const channel = await ChannelModel.getChannel(channelID);
            if (null === channel) {
                return false;
            }
            channel.name = newName;
            await channel.save();
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default ChannelModel;