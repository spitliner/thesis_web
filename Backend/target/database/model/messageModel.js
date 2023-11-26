import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";
import MessageSchema from "../schema/messageSchema.js";
const MessageMongoModel = mongoose.model("Message", MessageSchema, "Messages");
class MessageModel {
    static async getAllMessages(channelID) {
        return MessageMongoModel.find({
            _id: {
                channelID: channelID
            },
        }).select('-__v');
    }
    static async getMessages(channelID, isMod) {
        if (undefined === isMod || false === isMod) {
            return MessageMongoModel.find({
                _id: {
                    channelID: channelID
                },
                modAction: { "$not": "hide" }
            }).select('-__v');
        }
        return MessageMongoModel.find({
            _id: {
                channelID: channelID
            },
            modAction: "hide"
        }).select('-__v');
    }
    static async getSingleMessage(messageID, channelID) {
        return MessageMongoModel.findById({
            id: messageID,
            channelID: channelID
        }).select('-__v');
    }
    static async addMessage(userID, channelID, type, content) {
        try {
            const messageID = Snowflake.generate();
            const result = await MessageMongoModel.insertMany([{
                    _id: {
                        id: messageID,
                        channelID: channelID
                    },
                    createAt: new Date(),
                    modAction: "",
                    userID: userID,
                    type: type,
                    content: content
                }]);
            console.log(result);
            return result[0];
        }
        catch (error) {
            console.log(error);
            return "0000";
        }
    }
    static async editMessage(messageID, channelID, userID, editedContent) {
        try {
            const oldMessage = await MessageModel.getSingleMessage(messageID, channelID);
            if ("text" === oldMessage?.type) {
                if (editedContent !== oldMessage.content) {
                    const result = await MessageMongoModel.findOneAndUpdate({
                        _id: {
                            messageID: messageID,
                            channelID: channelID
                        },
                        userID: userID
                    }, {
                        lastEdited: new Date(),
                        content: editedContent
                    }, {
                        "new": true
                    }).select('-__v');
                    return result;
                }
                return undefined;
            }
            return undefined;
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }
    static async moderateMessage(messageID, channelID, action) {
        try {
            const result = await MessageMongoModel.findOneAndUpdate({
                _id: {
                    id: messageID,
                    channelID: channelID
                },
            }, {
                modAction: action
            }).select('-__v');
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async deleteMessage(channelID, messageID) {
        try {
            const result = await MessageMongoModel.deleteOne({
                _id: {
                    id: messageID,
                    channelID: channelID
                }
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async deleteChannelMessages(groupID, channelID) {
        try {
            const result = await MessageMongoModel.deleteMany({
                _id: {
                    channelID: channelID
                }
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async deleteUserMessage(userID) {
        try {
            const result = await MessageMongoModel.deleteMany({
                userID: userID
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async anonUserMessage(userID) {
        try {
            const result = await MessageMongoModel.updateMany({
                userID: userID
            }, {
                userID: "0000"
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async anonUserMessageChannel(userID, channelID) {
        try {
            const result = await MessageMongoModel.updateMany({
                _id: {
                    channelID: channelID
                },
                userID: userID
            }, {
                userID: "0000"
            });
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async searchInMessage(searchRegex, searchOption, channels) {
        return MessageMongoModel.find({
            _id: {
                channelID: channels
            },
            type: "text",
            content: { "$regex": searchRegex, "$options": searchOption }
        });
    }
}
export default MessageModel;
