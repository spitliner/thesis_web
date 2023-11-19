import mongoose from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

import MessageSchema from "../schema/messageSchema.js";

const MessageMongoModel = mongoose.model("Message", MessageSchema, "Messages");

class MessageModel {
    static async getMessages(channelID: string) {
        return MessageMongoModel.find({
            _id: {
                channelID: channelID
            },
        })
    }

    static async getSingleMessage(messageID: number, channelID: string) {
        return MessageMongoModel.findById({
            id: messageID,
            channelID: channelID
        })
    }

    static async addMessage(userID: string, channelID: string, type: string, content: string) {
        try {
            const result = await MessageMongoModel.insertMany([{
                _id: {
                    id: Snowflake.generate(),
                    channelID: channelID
                },
                createAt: new Date(),
                modAction: "",
                userID: userID,
                type: type,
                content: content
            }]);
            console.log(result);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async editMessage(messageID: number, channelID: string, editedContent: string) {
        try {
            const oldMessage = await MessageModel.getSingleMessage(messageID, channelID);
            if ("text" === oldMessage?.type) {
                if (editedContent !== oldMessage.content) {
                    const result = await MessageMongoModel.updateOne({
                        _id: {
                            messageID: messageID,
                            channelID: channelID
                        }
                    }, {
                        lastEdited: new Date(),
                        content: editedContent
                    })
                    console.log(result);
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
            const result = await MessageMongoModel.updateOne({
                _id: {
                    id: messageID,
                    channelID: channelID
                },
            }, {
                modAction: action
            });
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

    static async searchInMessage(searchRegex: string, searchOption: string,channels: [string]) {
        const result = await MessageMongoModel.find({
            _id: {
                channelID: channels
            },
            type: "text",
            content: { $regex: searchRegex, $options: searchOption }
        })
    }
}

export default MessageModel;