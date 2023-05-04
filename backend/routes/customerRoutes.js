const express = require("express");
const { getCustomerController, bookingCountController } = require("../controllers/customerController");

const router = express.Router();

// get all customers
router.get("/get-customers", getCustomerController)

// get booking data
router.get("/booking-count", bookingCountController )
module.exports = router;