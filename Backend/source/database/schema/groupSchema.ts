import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String , required: true, index: "text"},
    type: { type: String, required: true},
    private: { type: Boolean, default: false },
    setting: { type: String }
});

GroupSchema.indexes()

export default GroupSchema;