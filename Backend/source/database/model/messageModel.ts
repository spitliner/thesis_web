import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

import MessageSchema from "../schema/messageSchema.js";

const MessageMongoModel = mongoose.model("Message", MessageSchema, "Messages");

class MessageModel {
    static async getAllMessages(channelID: string) {
        return MessageMongoModel.find({
            _id: {
                channelID: channelID
            },
        }).select('-__v');
    }

    static async getMessages(channelID: string, isMod?: boolean) {
        if (undefined === isMod || false === isMod) {
            return MessageMongoModel.find({
                _id: {
                    channelID: channelID
                },
                modAction: {"$not": "hide"}
            }).select('-__v');
        }
        return MessageMongoModel.find({
            _id: {
                channelID: channelID
            },
            modAction: "hide"
        }).select('-__v');
    }

    static async getSingleMessage(messageID: string, channelID: string) {
        return MessageMongoModel.findById({
            id: messageID,
            channelID: channelID
        }).select('-__v');
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
                modAction: "",
                userID: userID,
                type: type,
                content: content
            }]);
            console.log(result);
            return result[0];
        } catch (error) {
            console.log(error);
            return "0000";
        }
    }

    static async editMessage(messageID: string, channelID: string, userID: string, editedContent: string) {
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
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static async moderateMessage(messageID: string, channelID: string, action: string) {
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
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async deleteMessage(channelID: string, messageID: string) {
        try {
            const result = await MessageMongoModel.deleteOne({
                _id: {
                    id: messageID,
                    channelID: channelID
                }
            })
            console.log(result)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async deleteChannelMessages(groupID: string, channelID: string) {
        try {
            const result = await MessageMongoModel.deleteMany({
                _id: {
                    channelID: channelID
                }
            })
            console.log(result)
            return true;
        } catch (error) {
            console.log(error);
            return false;
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
            });
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async anonUserMessageChannel(userID: string, channelID: string) {
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
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async searchInMessage(searchRegex: string, searchOption: string, channels: [string]) {
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