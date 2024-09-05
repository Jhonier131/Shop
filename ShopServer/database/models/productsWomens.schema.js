const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productsWomens = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        offSale: {
            type: Number
        },
        category: {
            type: Number
        }
    }
);

productsWomens.plugin(mongoosePaginate);

const productsW = model("productsWomens", productsWomens);

module.exports = {
    productsW
}