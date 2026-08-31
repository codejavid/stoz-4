import Product from "../models/Product.js";


// desc get all the products
// @route GET /api/products

export const getProducts = async(req, res) => {

    try{

        const products = await Product.find();

        res.json(products);

    }catch(error){
        res.status(500).json({message:error.message})
    }

}

// Create, update , delete, middleware