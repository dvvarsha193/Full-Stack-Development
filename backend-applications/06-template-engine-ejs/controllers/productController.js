import Product from "../models/productModel.js";
import mongoose from "mongoose";

const sampleProducts = [
  { _id: "67375a01e4b01a2b3c4d5e31", name: "Laptop Pro", description: "High-performance laptop for developers", category: "Electronics", price: 1299 },
  { _id: "67375a01e4b01a2b3c4d5e32", name: "Mechanical Keyboard", description: "RGB backlit mechanical keyboard", category: "Accessories", price: 89 },
  { _id: "67375a01e4b01a2b3c4d5e33", name: "Ergonomic Mouse", description: "Wireless precision ergonomic mouse", category: "Accessories", price: 59 }
];

const createProductForm = (req, res) => {
  res.render("product-form", { product: null });
};

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    if (mongoose.connection.readyState === 1) {
      const product = new Product({ name, description, category, price });
      await product.save();
    } else {
      sampleProducts.push({ _id: "new_" + Date.now(), name, description, category, price: Number(price) });
    }
    res.redirect("/");
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const readProducts = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const products = await Product.find({});
      res.render("products", { products });
    } else {
      res.render("products", { products: sampleProducts });
    }
  } catch (error) {
    res.render("products", { products: sampleProducts });
  }
};

const readProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(id);
      res.render("product", { product });
    } else {
      const product = sampleProducts.find(p => p._id === id) || sampleProducts[0];
      res.render("product", { product });
    }
  } catch (error) {
    res.render("product", { product: sampleProducts[0] });
  }
};

const updateProductForm = async (req, res) => {
  try {
    const { id } = req.params;
    const product = sampleProducts.find(p => p._id === id) || sampleProducts[0];
    res.render("product-form", { product });
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const updateProductById = async (req, res) => {
  res.redirect("/");
};

const deleteProductById = async (req, res) => {
  res.redirect("/");
};

export {
  createProductForm,
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProductById,
  deleteProductById,
};
