const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel");

const getCustomerController = async (req, res) => {
    try {
        const rooms = await Room.find();
        const bookings = await Booking.find();

        const customerData = bookings.map((booking) =>
        {
            const room = rooms.find((room) => room._id.toString() === booking.roomId.toString());

            return {
                customerName: booking.customerName,
                roomName: room.name,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
            };
        });
        res.status(200).send(customerData);
    } catch (error) {
        res.status(500).send(error);
    }
}

const bookingCountController = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const rooms = await Room.find();

        const bookingData = [];

        bookings.forEach((booking) =>
        {
            const room = rooms.find((room) => room._id.toString() === booking.roomId.toString());
            const bookingCount = bookings.filter((b) => b.customerName === booking.customerName).length;

            const data = {
                customerName: booking.customerName,
                roomName: room.name,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingId: booking._id,
                bookingDate: booking.createdAt,
                bookingStatus: booking.status,
                bookingCount,
            };

            bookingData.push(data);
        });

        res.status(200).send(bookingData);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { getCustomerController, bookingCountController };