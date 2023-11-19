import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    groupID: { type: String, required: true, index: 'hashed' },
    name: { type: String },
    settings: { type: String }
});

export default ChannelSchema;