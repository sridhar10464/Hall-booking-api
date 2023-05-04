const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
    {
        numberOfSeats: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
            required: true,
        },
        pricePerHour: {
            type: Number,
            required: true,
        },
    },
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;