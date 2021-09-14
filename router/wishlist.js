const express = require('express')
const router = express.Router()

const wishlistController = require('../controller/wishlistController');
const authController = require('../controller/authController')

router.use(authController.protected)
router.get('/delete', wishlistController.removeFromWishList)
router.post('/', wishlistController.addToWishlist)
router.get('/:userId', wishlistController.getWishlist)


module.exports = router