import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    _id: { type: [String] },
    channel: {type: String, required: true, unique: true}
});

export default RoleSchema;