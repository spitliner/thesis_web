import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    id: {type: String, required: true, index: { type: "hashed", unique: true }},
    groupID: { type: String, required: true, index: 'hashed' },
    name: { type: String },
    settings: { type: String }
});

export default ChannelSchema;