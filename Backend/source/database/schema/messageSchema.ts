import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    channelID: { type: String, required: true },
    userID: { type: String,  required: true },
    createAt: {type: Date, required: true},
    lastEdited: {type: Date},
    type: {type: String, required: true},
    reply: {type: String},
    content: {type: String, required: true, index: "text"},
    modAction: {type: String, required: false}
});

MessageSchema.index({id: 1, channelID: 1}, {unique: true});
MessageSchema.index({id: "hashed"});
MessageSchema.index({channelID: "hashed"});

export default MessageSchema;