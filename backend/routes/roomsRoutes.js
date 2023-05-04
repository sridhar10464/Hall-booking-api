const express = require("express");
const { createRoomController, bookingRoomController, roomsController } = require("../controllers/roomController");

const router = express.Router();

// create room
router.post("/add-room", createRoomController);

// book a room
router.post("/booking", bookingRoomController);

// get all rooms
router.get("/get-rooms", roomsController);


module.exports = router;