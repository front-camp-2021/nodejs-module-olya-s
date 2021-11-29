const fs = require('fs');

const getAllFavouriteProducts = (req, res) => {
  fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
    if(err) console.log("error: ", err);
    products = JSON.parse(data);
    res.send(products.filter(({isFavourite}) => isFavourite));
  });
}

const addFavouriteProduct = (req, res) => {
  let { id } = req.params;
  fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let products = JSON.parse(data);
    products = products.map(product => {
      if(product.id === id) {
        return { ...product, isFavourite: true };
      }
      return product;
    });
    fs.writeFile('./task4/db/products.json', JSON.stringify(products), (err) => {
      if(err) throw err;
    });
    res.status(200).json({status: "ok"});
  });
}

const deleteAllFavouriteProducts = (req, res) => {
  fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let products = JSON.parse(data);
    products = products.map(product => ({ ...product, isFavourite: false }));
    fs.writeFile('./task4/db/products.json', JSON.stringify(products), (err) => {
      if(err) throw err;
    });
    res.status(200).json({status: "ok"});
  });
}

const deleteFavouriteProductById = (req, res) => {
  let { id } = req.params;
  fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let products = JSON.parse(data);
    products = products.map(product => {
      if(product.id === id){
        return { ...product, isFavourite: false };
      }
      return product;
    });
    fs.writeFile('./task4/db/products.json', JSON.stringify(products), (err) => {
      if(err) throw err;
    });
    res.status(200).json({status: "ok"});
  });
}

module.exports = {
  getAllFavouriteProducts,
  addFavouriteProduct,
  deleteAllFavouriteProducts,
  deleteFavouriteProductById
}