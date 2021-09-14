const express = require('express')
const router = express.Router()

const PackageController = require('../controller/subscriptionPackage')

router.route('/')
    .post(PackageController.addPackage)
    .get(PackageController.getAllPackage)

router.route('/:packageId')
    .get(PackageController.getPackage)
    .patch(PackageController.updatePackage)
    .delete(PackageController.deletePackage)


module.exports = router