const Product = require('../schemas/ProductSchema');
const BaseModel = require("./BaseModel");

class ProductModel extends BaseModel {
    constructor() {
        super(Product);
    }
}

module.exports = ProductModel;
