const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const jwt = require('jsonwebtoken');
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes');

const app = express();
dotenv.config();

const PORT = 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middleware to parse JSON
app.use(express.json());


// Routes
app.use("/vendor", vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product',productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started and running successfully at port ${PORT}`);
});
