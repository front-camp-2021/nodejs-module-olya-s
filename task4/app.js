const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = 3000;

const products = require('./routes/products');
const favourite = require('./routes/favourite');
const pagination = require('./services/pagination');

const app = express();

const urlLog = require('./middlewares/url-log');
app.use(urlLog.log);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', products);
app.use('/favourite', favourite);

app.get('/categories', (req, res) => {
    fs.readFile('./task4/db/categories.json', 'utf-8', (err, data) => {
        if (err) console.log("error: ", err);
        categories = JSON.parse(data);
        res.send(categories.map(category => category.title));
    });
});

app.get('/brands', (req, res) => {
    fs.readFile('./task4/db/brands.json', 'utf-8', (err, data) => {
        if (err) console.log("error: ", err);
        brands = JSON.parse(data);
        res.send(brands.map(brand => brand.title));
    });
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    const categories = req.query.categories;
    const brands = req.query.brands;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    fs.readFile('./task4/db/products.json', 'utf-8', (err, data) => {
        if (err) console.log("error: ", err);
        let products = JSON.parse(data);
        const filteredProducts = products.filter(product => {
            const isQuery = query ? product.title.toLowerCase().includes(query.toLowerCase()) : true;
            const isCategory = categories ?
                categories.split(',').find(category => product.category === category.toLowerCase()) :
                true;
            const isBrand = brands ?
                brands.split(',').find(brand => product.brand === brand.toLowerCase()) :
                true;
            const isInPriceRange = (minPrice && maxPrice) ? (product.price >= minPrice && product.price <= maxPrice) : true;

            if (isQuery && isCategory && isBrand && isInPriceRange) {
                return product;
            }
        });

        const result = pagination.paginatedResults(filteredProducts, req);
        res.json(result);
    });
});

app.listen(port, () => {
    console.log('Server is running');
});