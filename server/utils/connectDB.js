const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://akashrmay:Akash2003@cluster0.rkxlm2x.mongodb.net/AI-content-generator"
    );
    console.log(`Mongodb connected${connect.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
