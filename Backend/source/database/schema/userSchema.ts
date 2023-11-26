import mongoose from "mongoose";

const openIDschema = new mongoose.Schema({
    provider: { type: String, required: true },
    token: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true, index: "text" },
    password: { type: String },
    openIDAuth: { type: openIDschema },
    email: { type: String, index: { type: "hashed", unique: true, sparse: true } },
    settings: { type: String, required: true },
    lastOnline: {type: Date}
});

export default UserSchema;