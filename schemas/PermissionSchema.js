const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Permission', permissionSchema);
