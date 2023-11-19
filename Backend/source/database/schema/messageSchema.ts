import mongoose from "mongoose";

const MessageIDSchema = new mongoose.Schema({
    id: { type: "Number", required: true },
    channelID: { type: String, required: true },
});

const MessageSchema = new mongoose.Schema({
    _id: { type: MessageIDSchema, required: true },
    userID: { type: String,  required: true },
    createAt: {type: Date, required: true},
    lastEdited: {type: Date},
    type: {type: String, required: true},
    content: {type: String, required: true, index: "text"},
    modAction: {type: String, required: true}
});

export default MessageSchema;