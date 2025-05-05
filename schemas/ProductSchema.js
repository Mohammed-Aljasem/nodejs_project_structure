const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    qty: String,
});

module.exports = mongoose.model('Product', productSchema);
