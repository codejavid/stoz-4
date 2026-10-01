import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello iam a node js");
});

app.get("/getjson", (req, res) => {
  res.json({
    msg: "Hello im json from node",
  });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Error handler (catches multer errors like invalid file type / file too large)
app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
