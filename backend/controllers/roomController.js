const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel");

// create room
const createRoomController = async (req, res) => {
    try {
        const room = new Room({
            numberOfSeats: req.body.numberOfSeats,
            amenities: req.body.amenities,
            pricePerHour: req.body.pricePerHour
        });
        await room.save();
        return res.status(201).json({ message: "Room created successfully" });
    } catch (error) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error creating room" });
        }
    };
}
    
    // Create a new instance of the room model
    // const room = new Room({
    //     numberOfSeats: req.body.numberOfSeats,
    //     amenities: req.body.amenities,
    //     pricePerHour: req.body.pricePerHour
    // });

    // Save the room to the database
//    await room.save((err) => {
        // if (err) {
        //     console.log(err);
        //     return res.status(500).json({ message: "Error creating room" });
        // }
//         return res.status(201).json({ message: "Room created successfully" });
//     });


// Book a room
const bookingRoomController = async (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    
  try {
    // Check if the room is available
    const room = await Room.findById(roomId);
    const bookings = await Booking.find({ roomId, date });

    const isAvailable = bookings.every(
      (booking) =>
        (startTime >= booking.endTime || endTime <= booking.startTime)
    );

    if (!isAvailable) {
      return res.status(400).send('Room is already booked at that time');
    }

    // Create a new booking
    const newBooking = new Booking({
      customerName,
      date,
      startTime,
      endTime,
      roomId,
    });

    await newBooking.save();

    res.status(200).send(newBooking);
  } catch (err) {
    res.status(500).send(err);
  }
}

const roomsController = async (req, res) => {
    try {
        const rooms = await Room.find();
        const bookings = await Booking.find();

        const roomData = rooms.map((room) => {
            const bookedData = bookings.filter(
                (booking) => booking.roomId.toString() === room._id.toString()
            );

            const bookedStatus = bookedData.length > 0;

            return {
                roomName: room.name,
                bookedStatus,
                bookings: bookedData.map((booking) =>
                {
                    return {
                        customerName: booking.customerName,
                        date: booking.date,
                        startTime: booking.startTime,
                        endTime: booking.endTime,
                    };
                })
            };
        });
        res.status(200).send(roomData);
    } catch (error) {
        res.status(500).send(error)
    }
};

    // Check if the requested room is available for the given time slot
//    await Booking.findOne({
//         room: req.body.roomId,
//         date: req.body.date,
//         $or: [
//             {
//                 startTime: { $gte: req.body.startTime, $lt: req.body.endTime }
//             },
//             {
//                 endTime: { $gt: req.body.startTime, $lte: req.body.endTime }
//             },
//             {
//                 startTime: { $lte: req.body.startTime },
//                 endTime: { $gte: req.body.endTime }
//             }
//         ]
//     }, (err, booking) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ message: "Error booking room" });
//         }
//         if (booking) {
//             return res.status(400).json({ message: "Room is already booked for given time slot" });
//         }

        // Create a new instance of the booking model
        // const newBooking = new Booking({
        //     customerName: req.body.customerName,
        //     date: req.body.date,
        //     startTime: req.body.startTime,
        //     endTime: req.body.endTime,
        //     room: req.body.roomId
        // });

        // Save the booking to the database
    //     newBooking.save((err) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(500).json({message: "Server error"})
    //         }
    //     })
    // })


module.exports = { createRoomController, bookingRoomController, roomsController };