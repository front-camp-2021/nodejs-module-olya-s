const express = require('express');
const router = express.Router();

const favouriteController = require('../controllers/favourite');

router.get('/', favouriteController.getAllFavouriteProducts);
router.post('/:id', favouriteController.addFavouriteProduct);
router.delete('/', favouriteController.deleteAllFavouriteProducts);
router.delete('/:id', favouriteController.deleteFavouriteProductById);

module.exports = router;