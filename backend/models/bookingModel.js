const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: Number,
            required: true,
        },
        endTime: {
            type: Number,
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
    },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;