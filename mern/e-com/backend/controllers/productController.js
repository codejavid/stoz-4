import Product from "../models/Product.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";



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

// desc get single product by id
// @route GET /api/products/:id

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc create all the products (admin only)
// @route POST /api/products

export const createProducts = async(req, res) => {

    try{

        const { name, price, description, category, stock } = req.body;

        if(!req.file){
            return res.status(400).json({message:"Product image is required"})
        }

        const result = await uploadToCloudinary(req.file.buffer);

        const product = new Product({
            name, 
            price, 
            description, 
            image: result.secure_url, 
            imagePublicId: result.public_id,
            category, 
            stock
        })

        const createdProduct = await product.save();

        res.status(201).json(createdProduct);

    }catch(error){
        res.status(500).json({message:error.message})
    }

}

// desc update a product (admin only)
// @route POST /api/products:/id

export const updateProduct = async(req, res) => {

    try{

        const { name, price, description, category, stock } = req.body;
        
        const product = await Product.findById(req.params.id);
        
        if(product){

            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;

            // Replace the image only when a new file was uploaded
            if(req.file){
                const result = await uploadToCloudinary(req.file.buffer);
                await deleteFromCloudinary(product.imagePublicId);
                product.image = result.secure_url;
                product.imagePublicId = result.public_id;
            }

            product.category = category || product.category;
            product.stock = stock || product.stock;

            const updatedProduct = await product.save()

             res.json({
                success:true,
                product:updatedProduct
             })

        }else{
             res.status(404).json({
                success:false,
                message:"Product not found"
             })
        }

       

    }catch(error){
        res.status(500).json({message:error.message})
    }

}


// desc delete a product (admin only)
// @route DELETE /api/products:/id

export const deleteProduct = async(req, res) => {

    try{
        
        const product = await Product.findById(req.params.id);
        
        if(product){

             await deleteFromCloudinary(product.imagePublicId);
             await product.deleteOne();

             res.json({
                success:true,
                product:"Product Remove"
             })

        }else{
             res.status(404).json({
                success:false,
                message:"Product not found"
             })
        }

    
    }catch(error){
        res.status(500).json({message:error.message})
    }

}