import mongoose from "mongoose";
const oathSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    token: { type: String, required: true }
});
const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true, index: "text" },
    password: { type: String },
    oauth: { type: oathSchema },
    email: { type: String, index: { type: "hashed", unique: true, sparse: true } },
    settings: { type: String, equired: true },
    lastOnline: { type: Date }
});
export default UserSchema;
