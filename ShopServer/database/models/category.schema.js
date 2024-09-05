const { Schema, model } = require("mongoose");

const category = new Schema(
    {
        id: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        }
    }
);

const categoryProducts = model("category", category);
module.exports = {
    categoryProducts
}