const { response } = require("./helpers/dataResponse");
const { productsW } = require('../database/models/productsWomens.schema.js');

const getAllProducts = async (req, res) => {
    try {
        // const products = await productsW.find();
        // response(res, { payload: products})

        console.log('Datos paginacion', req.body);

        // const { page, limit, sort } = req.body;

        const page = parseInt(req.body.page) || 1;  // Página actual, por defecto 1
        const limit = parseInt(req.body.limit) || 10; // Límite de productos por página, por defecto 10
        const sort = req.body.sort || { price: 1 }; // Ordenación, por defecto ascendente por precio

        // // Configura las opciones de paginación
        const options = {
            page: page,
            limit: limit,
            sort: sort
        };

        // Usa el método paginate para obtener los productos paginados
        const result = await productsW.paginate({}, options);
        const totalPages = result.totalPages;
        const remainingPages = totalPages - result.page;

        const dataPayload = {
            resultDocs:result.docs, // Productos en la página actual
            totalDocs: result.totalDocs, // Total de productos encontrados
            limit: result.limit, // Límite por página
            totalPages: result.totalPages, // Total de páginas
            page: result.page, // Página actual
            hasPrevPage: result.hasPrevPage, // Si existe una página anterior
            hasNextPage: result.hasNextPage, // Si existe una página siguiente
            prevPage: result.prevPage, // Número de la página anterior
            nextPage: result.nextPage, // Número de la página siguiente
            remainingPages: remainingPages // Páginas restantes
        }

        // Envía la respuesta con los datos paginados
        response(res, {payload: dataPayload});



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

const getProductsByCategory = async (req, res) => {
    try {
        const idCategory = parseInt(req.params.category);
        const products = await productsW.find({ "category": idCategory });
        response(res, { payload: products });
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getAllProducts,
    saleProducts,
    getProductsByCategory
}