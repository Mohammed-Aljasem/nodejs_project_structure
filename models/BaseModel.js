const User = require("../schemas/UserSchema");

class BaseModel {
    constructor(schema) {
        this.modelSchema = schema;
    }

    async create(modelData){
        const model = new this.modelSchema(modelData);
        await model.save();
        return model;
    }

    async getAll(){
        return this.modelSchema.find();
    }

    async findOne(id) {
        return this.modelSchema.findById(id);
    }

    async update(id, modelData) {
        return this.modelSchema.findByIdAndUpdate(id, modelData);
    }

    async delete(id) {
        return this.modelSchema.findByIdAndDelete(id);
    }

    async getName(id){
        const model =  await this.findOne(id);
        return model.name;
    }
}


module.exports = BaseModel;
