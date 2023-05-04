const { mongoose } = require("mongoose");

// connectDB function
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB is connected on ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${ error.message }`);
        process.exit(1)
    }
}

// export
module.exports = connectDB