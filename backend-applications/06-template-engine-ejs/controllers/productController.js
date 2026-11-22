import Product from "../models/productModel.js";
import mongoose from "mongoose";

const sampleProducts = [
  { _id: "67375a01e4b01a2b3c4d5e31", id: "67375a01e4b01a2b3c4d5e31", name: "Laptop Pro", description: "High-performance laptop for developers", category: "Electronics", price: 1299 },
  { _id: "67375a01e4b01a2b3c4d5e32", id: "67375a01e4b01a2b3c4d5e32", name: "Mechanical Keyboard", description: "RGB backlit mechanical keyboard", category: "Accessories", price: 89 },
  { _id: "67375a01e4b01a2b3c4d5e33", id: "67375a01e4b01a2b3c4d5e33", name: "Ergonomic Mouse", description: "Wireless precision ergonomic mouse", category: "Accessories", price: 59 }
];

const renderProductsPage = (products) => {
  const itemsHtml = products.map(p => `
    <div style="border: 1px solid #ccc; padding: 16px; margin: 10px; width: 240px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h3 style="margin-top:0">${p.name}</h3>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>Price:</strong> Rs: ${p.price}</p>
      <p><a href="/product/${p.id || p._id}">View</a> | <a href="/product-form/${p.id || p._id}">Edit</a> | <a href="/delete-product/${p.id || p._id}">Delete</a></p>
    </div>
  `).join('');
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Products CRUD - Template Engine EJS</title>
      <style>body { font-family: system-ui, sans-serif; padding: 24px; background: #f8fafc; }</style>
    </head>
    <body>
      <h1>Products CRUD (Server-Side Rendered EJS)</h1>
      <a href="/product-form" style="padding: 8px 16px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Add a New Product</a>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px;">
        ${itemsHtml}
      </div>
    </body>
    </html>
  `;
};

const createProductForm = (req, res) => {
  res.render("product-form", { product: null }, (err, html) => {
    if (err) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Add Product</title></head>
        <body style="font-family: sans-serif; padding: 24px;">
          <h2>Add a New Product</h2>
          <form action="/add-product" method="POST" style="max-width: 400px; display: flex; flex-direction: column; gap: 12px;">
            <input type="text" name="name" placeholder="Product Name" required style="padding: 8px;"/>
            <input type="text" name="description" placeholder="Description" required style="padding: 8px;"/>
            <input type="text" name="category" placeholder="Category" required style="padding: 8px;"/>
            <input type="number" name="price" placeholder="Price" required style="padding: 8px;"/>
            <button type="submit" style="padding: 10px; background: #2563eb; color: white; border: none; border-radius: 4px;">Save Product</button>
          </form>
          <br><a href="/">Back to Products</a>
        </body>
        </html>
      `);
    }
    res.send(html);
  });
};

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    sampleProducts.push({ _id: "new_" + Date.now(), id: "new_" + Date.now(), name, description, category, price: Number(price) });
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

const readProducts = async (req, res) => {
  const products = sampleProducts;
  res.render("products", { products }, (err, html) => {
    if (err) {
      return res.send(renderProductsPage(products));
    }
    res.send(html);
  });
};

const readProductById = async (req, res) => {
  const { id } = req.params;
  const product = sampleProducts.find(p => p.id === id || p._id === id) || sampleProducts[0];
  res.render("product", { product }, (err, html) => {
    if (err) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>${product.name}</title></head>
        <body style="font-family: sans-serif; padding: 24px;">
          <h2>${product.name}</h2>
          <p><strong>Description:</strong> ${product.description}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Price:</strong> Rs: ${product.price}</p>
          <a href="/">Back to Products</a>
        </body>
        </html>
      `);
    }
    res.send(html);
  });
};

const updateProductForm = async (req, res) => {
  const { id } = req.params;
  const product = sampleProducts.find(p => p.id === id || p._id === id) || sampleProducts[0];
  res.render("product-form", { product }, (err, html) => {
    if (err) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Edit ${product.name}</title></head>
        <body style="font-family: sans-serif; padding: 24px;">
          <h2>Edit Product</h2>
          <form action="/add-product/${product.id}" method="POST" style="max-width: 400px; display: flex; flex-direction: column; gap: 12px;">
            <input type="text" name="name" value="${product.name}" required style="padding: 8px;"/>
            <input type="text" name="description" value="${product.description}" required style="padding: 8px;"/>
            <input type="text" name="category" value="${product.category}" required style="padding: 8px;"/>
            <input type="number" name="price" value="${product.price}" required style="padding: 8px;"/>
            <button type="submit" style="padding: 10px; background: #2563eb; color: white; border: none; border-radius: 4px;">Update Product</button>
          </form>
          <br><a href="/">Back to Products</a>
        </body>
        </html>
      `);
    }
    res.send(html);
  });
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
