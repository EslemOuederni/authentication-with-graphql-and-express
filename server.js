const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index.route');

require('dotenv').config()

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB

app.use(express.json()); // Body parser middleware

// Routes
app.use(router);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("connected to db & listening on port", 3000);
    });
  })
  .catch((error) => {
    console.log(error);
  });