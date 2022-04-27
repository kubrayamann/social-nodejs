const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const autRoute = require("./routes/auth");

dotenv.config();
 
mongoose.connect(
    process.env.MONGO_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log("Error connecting to MongoDB", err);
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));



app.use("/api/users", userRoute);
app.use("/api/auth", autRoute);
 
app.listen(8800, () => {
  console.log("Backend Server is running on port 8800");
});