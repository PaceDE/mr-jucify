require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://jucify_admin:Myjucifyid14@cluster0.ihjpu.mongodb.net/mr-jucify?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.log("DB error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
