import express from "express";
import { getProducts, createProducts, updateProduct, deleteProduct} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js"


const router = express.Router();

router.route("/")
.get(getProducts)
.post(protect,admin,createProducts)

router.route("/:id")
.put(protect,admin,updateProduct)
.delete(protect,admin,deleteProduct)




export default router;