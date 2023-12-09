import mongoose from "mongoose";

const composeSchema = new mongoose.Schema({
    value1: {type: String, required: true},
    value2: {type: String, required: true}
});

const testSchema = new mongoose.Schema({
    _id: {type: composeSchema, required: true},
    value: {type: String, required: true},
    composeValue: { type: composeSchema, required: true }
});

const testModel = mongoose.model("test", testSchema);

class testDB {
    static async addData(id1: string, id2: string, value: string, value1: string, value2: string) {
        return testModel.insertMany([{
            _id: {
                value1: id1,
                value2: id2
            },
            value: value,
            composeValue: {
                value1: value1,
                value2: value2
            }
        }]);
    }

    static async getData(id1: string, id2: string) {
        return testModel.findOne({
            _id: {value1: id1,
            value2: id2}
        }, '-__v').lean().exec();
    }

    static async updateData(id:string, value: string) {
        return testModel.findOneAndUpdate(
            {
                _id: id
            }, {
                value: value
            }, {
                "new": true
            }).select("-__v").lean().exec();
    }
}

export default testDB;