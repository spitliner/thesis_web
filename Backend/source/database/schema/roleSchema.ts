import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    userID: {type: String, required: true}, 
    groupID: { type: String, required: true },
    role: { type: String, required: true },
    nickname: { type: String, required: true , index: { type: "hashed", sparse: true } },
    allowChannel: {type: String, required: true}
});

RoleSchema.index({userID: 1, groupID: 1}, {unique: true});
RoleSchema.index({userID: "hashed"});
RoleSchema.index({groupID: "hashed"});

export default RoleSchema;