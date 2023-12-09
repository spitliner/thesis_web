import mongoose from "mongoose";

const openIDschema = new mongoose.Schema({
    provider: { type: String, required: true },
    token: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: "hashed", unique: true } },
    username: { type: String, required: true, index: "text" },
    password: { type: String },
    openIDAuth: { type: openIDschema },
    email: { type: String, required: true, index: { type: "hashed", unique: true } },
    settings: { type: String, required: true },
    lastOnline: {type: Date},
    friends: {type: String}
});

export default UserSchema;