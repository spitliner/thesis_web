import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String , required: true, index: "text"},
    type: { type: String, required: true},
    private: { type: Boolean, default: false },
    invite: {type: String, index: { type: "hashed", sparse: true, unique: true }},
    setting: { type: String }
});

export default GroupSchema;