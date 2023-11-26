import dotenv from 'dotenv';
import mongoose from "mongoose";
import UserSchema from "./schema/userSchema.js";
dotenv.config();
const server = String(process.env.DB_PORT);
const databaseName = String(process.env.DB_NAME);
console.log(server + " " + databaseName);
/*
mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});
*/
const userMongoModel = mongoose.model("User", UserSchema, "Users");
mongoose
    .connect(`mongodb://${server}/${databaseName}`)
    .then(() => {
    console.log('MongoDB connected');
    //console.log(conn.connection.collections)
})
    .catch(err => {
    console.log('Failed to connect to MongoDB', err);
});
userMongoModel.insertMany([
    {
        _id: "0000000000000001",
        username: "Deleted User",
        password: "null",
        email: "null",
        settings: ""
    }
]);
