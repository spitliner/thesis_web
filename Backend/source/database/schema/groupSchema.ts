import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: "hashed", unique: true } },
    name: { type: String , required: true, index: "text"},
    type: { type: String, required: true},
    private: { type: Boolean, default: false },
    invite: {type: String, index: { type: "hashed", sparse: true, unique: true }},
    settings: { type: String }
});

export default GroupSchema;