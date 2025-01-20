const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "no puede estar vacio"]
    },
    description: {
        type: String,
        required: [true, "no puede estar vacio"]
    },
    price: {
        type: Number,
        required: [true, "no puede estar vacio"]
    },
    category: {
        type: String,
        required: [true, "no puede estar vacio"]
    },
    pictures: {
        type: Array,
        required: true
    }
}, { minimize: false });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;