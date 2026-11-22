const sampleProducts = [
  { _id: "67375a01e4b01a2b3c4d5e31", id: "67375a01e4b01a2b3c4d5e31", name: "Laptop Pro", description: "High-performance laptop for developers", category: "Electronics", price: 1299 },
  { _id: "67375a01e4b01a2b3c4d5e32", id: "67375a01e4b01a2b3c4d5e32", name: "Mechanical Keyboard", description: "RGB backlit mechanical keyboard", category: "Accessories", price: 89 },
  { _id: "67375a01e4b01a2b3c4d5e33", id: "67375a01e4b01a2b3c4d5e33", name: "Ergonomic Mouse", description: "Wireless precision ergonomic mouse", category: "Accessories", price: 59 }
];

const renderProductsPage = (products) => {
  const itemsHtml = products.map(product => `
    <div style="border: 1px solid #000; padding: 10px; margin: 10px; width: 220px; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0,0,0,0.5);">
      <p>Product Name: ${product.name}</p>
      <p>Product Category: ${product.category}</p>
      <p>Product Price: Rs: ${product.price}</p>
      <p>
        <a href="/product/${product.id || product._id}">View</a> | 
        <a href="/product-form/${product.id || product._id}">Edit</a> | 
        <a href="/delete-product/${product.id || product._id}">Delete</a>
      </p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1>Products CRUD</h1>
  <a href="/product-form" style="display:inline-block; padding: 6px 12px; background: #0070f3; color: white; text-decoration: none; border-radius: 4px;">Add a New Product</a>
  <br><br>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;"> 
    ${itemsHtml}
  </div>
</body>
</html>`;
};

const createProductForm = (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add Product</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1>Add a New Product</h1>
  <form action="/add-product" method="POST" style="max-width: 350px; display: flex; flex-direction: column; gap: 10px;">
    <input type="text" name="name" placeholder="Product Name" required style="padding: 8px;"/>
    <input type="text" name="category" placeholder="Product Category" required style="padding: 8px;"/>
    <input type="number" name="price" placeholder="Product Price" required style="padding: 8px;"/>
    <textarea name="description" placeholder="Product Description" required style="padding: 8px;"></textarea>
    <button type="submit" style="padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Product</button>
  </form>
  <br><a href="/">Back to Products</a>
</body>
</html>`);
};

const createProduct = async (req, res) => {
  const { name, description, category, price } = req.body;
  const newId = "prod_" + Date.now();
  sampleProducts.push({ _id: newId, id: newId, name, description, category, price: Number(price) });
  res.redirect("/");
};

const readProducts = async (req, res) => {
  res.send(renderProductsPage(sampleProducts));
};

const readProductById = async (req, res) => {
  const { id } = req.params;
  const product = sampleProducts.find(p => p.id === id || p._id === id) || sampleProducts[0];
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${product.name}</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1>${product.name}</h1>
  <p><strong>Category:</strong> ${product.category}</p>
  <p><strong>Price:</strong> Rs: ${product.price}</p>
  <p><strong>Description:</strong> ${product.description}</p>
  <br>
  <a href="/">Back to Products</a>
</body>
</html>`);
};

const updateProductForm = async (req, res) => {
  const { id } = req.params;
  const product = sampleProducts.find(p => p.id === id || p._id === id) || sampleProducts[0];
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edit Product</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h1>Edit Product: ${product.name}</h1>
  <form action="/add-product/${product.id || product._id}" method="POST" style="max-width: 350px; display: flex; flex-direction: column; gap: 10px;">
    <input type="text" name="name" value="${product.name}" required style="padding: 8px;"/>
    <input type="text" name="category" value="${product.category}" required style="padding: 8px;"/>
    <input type="number" name="price" value="${product.price}" required style="padding: 8px;"/>
    <textarea name="description" required style="padding: 8px;">${product.description}</textarea>
    <button type="submit" style="padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Update Product</button>
  </form>
  <br><a href="/">Back to Products</a>
</body>
</html>`);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price } = req.body;
  const prod = sampleProducts.find(p => p.id === id || p._id === id);
  if (prod) {
    prod.name = name;
    prod.description = description;
    prod.category = category;
    prod.price = Number(price);
  }
  res.redirect("/");
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const idx = sampleProducts.findIndex(p => p.id === id || p._id === id);
  if (idx !== -1) {
    sampleProducts.splice(idx, 1);
  }
  res.redirect("/");
};

export {
  createProductForm,
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct,
};
