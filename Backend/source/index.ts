import dotenv from 'dotenv';
dotenv.config()

import mongoose from 'mongoose';
import testDB from './test/testDB.js';

//----

mongoose.connection.on("open", function() {
    //console.log(ref);
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(error) {
    console.log("Could not connect to mongo server!");
    console.log(error);
});

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {dbName: process.env.DB_NAME});

//----

testDB.getData("1", "2").then(result => {
    console.log(result);
})
