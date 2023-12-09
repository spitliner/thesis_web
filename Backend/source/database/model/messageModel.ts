import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

import MessageSchema from "../schema/messageSchema.js";

const MessageMongoModel = mongoose.model("Message", MessageSchema, "Messages");

class MessageModel {
    static async getAllMessages(channelID: string) {
        return MessageMongoModel.find({
            channelID: channelID,
        }).select('-__v -_id').lean().exec();
    }

    static async getMessages(channelID: string, isModFeed?: boolean) {
        if (undefined === isModFeed || false === isModFeed) {
            return MessageMongoModel.find({
                channelID: channelID,
                modAction: {
                    "$not": {
                        "$regex": "hide"
                    }
                }
            }, "-__v -_id").lean().exec();
        }
        return MessageMongoModel.find({
            channelID: channelID,
            modAction: "hide"
        }, "-__v -_id").lean().exec();
    }

    static async getSingleMessageData(messageID: string, channelID: string) {
        return MessageMongoModel.findById({
            id: messageID,
            channelID: channelID
        }, "-__v -_id").lean().exec();
    }

    static async getSingleMessage(messageID: string, channelID: string) {
        return MessageMongoModel.findOne({
            id: messageID,
            channelID: channelID
        }, "-__v -_id").exec();
    }

    static async addMessage(userID: string, channelID: string, type: string, content: string) {
        try {
            const messageID = Snowflake.generate();
            const result = await MessageMongoModel.insertMany([{
                _id: {
                    id: messageID,
                    channelID: channelID
                },
                createAt: new Date(),
                userID: userID,
                type: type,
                content: content
            }]);
            //console.log(result);
            return result[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async editMessage(messageID: string, channelID: string, userID: string, editedContent: string) {
        try {
            const oldMessage = await MessageModel.getSingleMessage(messageID, channelID);
            if (null !== oldMessage && userID === oldMessage.userID) {
                if (oldMessage.content !== editedContent) {
                    oldMessage.content = editedContent;
                    oldMessage.lastEdited = new Date();
                    await oldMessage.save();
                }
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async moderateMessage(messageID: string, channelID: string, action: string) {
        try {
            const oldMessage = await MessageModel.getSingleMessage(messageID, channelID);
            let result = null;
            if (null !== oldMessage) {
                if (oldMessage.modAction !== action) {
                    oldMessage.modAction = action;
                    result = await oldMessage.save();
                }
                return result === oldMessage;
            }
            return false;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async deleteMessage(channelID: string, messageID: string) {
        try {
            const result = await MessageMongoModel.deleteOne({
                id: messageID,
                channelID: channelID
            }).lean().exec();
            console.log(result)
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async deleteChannelMessages(channelID: string) {
        try {
            const result = await MessageMongoModel.deleteMany({
                channelID: channelID
            }).lean().exec();
            console.log(result)
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async deleteMessagesInChannel(userID: string, channelID: string) {
        try {
            const result = await MessageMongoModel.deleteMany({
                channelID: channelID,
                userID: userID
            }).lean().exec();
            console.log(result)
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async deleteUserMessage(userID: string) {
        try {
            const result = await MessageMongoModel.deleteMany({
                userID: userID
            })
            console.log(result)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async anonUserMessage(userID: string) {
        try {
            const result = await MessageMongoModel.updateMany({
                userID: userID
            }, {
                userID: "0000"
            }).lean().exec();
            console.log(result);
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async anonUserMessageChannel(userID: string, channelID: string) {
        try {
            const result = await MessageMongoModel.updateMany({
                channelID: channelID,
                userID: userID
            }, {
                userID: "0000"
            }).lean().exec();
            console.log(result);
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async searchInMessage(searchPhrase: string, searchOption: string, channels: [string]) {
        return MessageMongoModel.find({
            channelID: channels,
            type: "text",
            $text : {
                $search: searchPhrase
            }
        }).sort({createAt: 1}).lean().exec();
    }

    static async searchMention(userID: string, searchOption: string, channels: [string]) {
        return MessageMongoModel.find({
            channelID: channels,
            type: "mention",
            content: userID
        }).sort({createAt: 1}).lean().exec();
    }

    static async searchAuthor(userID: string, searchOption: string, channels: [string]) {
        return MessageMongoModel.find({
            channelID: channels,
            userID: userID,
        }).sort({createAt: 1}).lean().exec();
    }
}

export default MessageModel;