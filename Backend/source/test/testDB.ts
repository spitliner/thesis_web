import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    value: {type: String, required: true}
});

const testModel = mongoose.model("test", testSchema);

class testDB {
    static async addData(id: string, value: string) {
        return testModel.insertMany([{
            _id: id,
            value: value
        }], );
    }

    static async getData(value: string) {
        return testModel.find({
            value: value
        });
    }

    static async updateData(id:string, value: string) {
        return testModel.findOneAndUpdate(
            {
                _id: id
            }, {
                value: value
            }, {
                "new": true
            })
    }
}

export default testDB;