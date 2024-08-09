const { response } = require("./helpers/dataResponse");
const { productsW } = require('../database/models/productsWomens.schema.js');


const getAllProducts = async (req, res) => {
    try {
        const products = await productsW.find();
        response(res, { payload: products})
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const saleProducts = async (req, res) => {
    try {
        const { name, price, description, offSale } = req.body;

        const message = `Nombre: ${name}\nPrecio: $${price}\nDescripción: ${description}\nDescuento: ${offSale}%`;
        const encodedMessage = encodeURIComponent(message);

        const whatsappLink = `https://api.whatsapp.com/send?phone=3217742884&text=${encodedMessage}`;
        console.log(whatsappLink);

    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getAllProducts,
    saleProducts
}