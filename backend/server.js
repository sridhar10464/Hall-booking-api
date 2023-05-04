const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");

// dotenv config
dotenv.config();

// db config
connectDB()

const app = express();

// middlewares
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/rooms", require("./routes/roomsRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));

// port
const PORT = process.env.PORT || 8000

// app listen
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})