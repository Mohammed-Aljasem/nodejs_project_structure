const Product = require('../models/ProductModel');
const resizeImage = require('../helpers/resizeImages');
const translation = require('../helpers/translation');

class ProductController {
    static async index(req, res) {
        const productModel = new Product()
        const products = await productModel.getAll()
        return res.status(200).json(products);
    }

    static async view(req, res) {
        try {
            const productModel = new Product();
            const product = await productModel.findOne(req.params.id) // <-- find by ID
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async name(req, res) {
        try {
            const productModel = new Product();
            const name = await productModel.getName(req.params.id)
            res.json({name});
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async create(req, res) {
        const productData = req.body;
        const fileName = await resizeImage(req.file.buffer, 'avatars')
        const language = req.headers['accept-language']
        productData.image = fileName
        const productModel = new Product()
        await productModel.create(productData)
        return res.status(201).json({message: translation(language, 'product_created'), product: req.body});
    }

    static async update(req, res) {
        const productModel = new Product()
        const product = await productModel.update(req.params.id, req.body)
        return res.status(200).json(product);
    }

    static async delete(req, res) {
        try {
            const productModel = new Product()
            const deletedProduct = await productModel.delete(req.params.id);

            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
}


module.exports = ProductController;
