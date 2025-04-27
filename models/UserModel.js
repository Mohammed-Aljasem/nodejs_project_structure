const User = require('../schemas/UserSchema');

class UserModel {
     async create(userData){
        const user = new User(userData);
        await user.save();
        return user;
    }

    async getAll(){
         return User.find();
    }

    async findOne(id) {
        return User.findById(id);
    }

    async update(id, userData) {
        return User.findByIdAndUpdate(id, userData);
    }

    async delete(id) {
        return User.findByIdAndDelete(id);
    }
}

module.exports = UserModel;
