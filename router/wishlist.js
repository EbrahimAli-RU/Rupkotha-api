const express = require('express')
const router = express.Router()

const wishlistController = require('../controller/wishlistController');

router.post('/', wishlistController.addToWishlist)
router.get('/:userId', wishlistController.getWishlist )

module.exports = router