import mongoose from "mongoose";

const roleSchemaID = new mongoose.Schema({
    userID: {type: String, required: true}, 
    groupID: { type: String, required: true },
})

const RoleSchema = new mongoose.Schema({
    _id: { 
        type: roleSchemaID,
        required: true
    },
    role: { type: String, required: true },
    nickname: { type: String, index: { type: "hashed", sparse: true } }
});

export default RoleSchema;