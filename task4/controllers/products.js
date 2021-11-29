const fs = require('fs');
const pagination = require('../services/pagination');

const getAllProducts = (req, res) => {
  fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
    if(err) console.log("error: ", err);
    products = JSON.parse(data);
    const result = pagination.paginatedResults(products, req);
    res.send(result);
  });
}

const getProductById = (req, res) => {
  let { id } = req.params;
  fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
    if(err) console.log("error: ", err);
    const products = JSON.parse(data);
    const product = products.filter(product => product.id === id);
    res.send(product);
  });
}

module.exports = {
  getAllProducts,
  getProductById
}