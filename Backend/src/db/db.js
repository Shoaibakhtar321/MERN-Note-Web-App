const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Shoaib:NyoWKdVtAfaOff9u@cluster0.r1o7muh.mongodb.net/notes",
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
