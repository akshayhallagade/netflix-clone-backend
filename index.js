require("dotenv").config();

//Imports
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const watchlistRoutes = require("./routes/watchlist");
const cors = require("cors");
const { AuthenticationMiddleware } = require("./middleware/authentication");

// Variables
const PORT = process.env.PORT;
const app = express();

// MongoDB Connetion
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Database connected successfully");
});

//middlewares
app.use(express.json());
app.use(cors());
app.use(AuthenticationMiddleware());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "this is the app" });
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/watchlist", watchlistRoutes);

app.listen(PORT, () => {
  console.log("App connected to port : ", PORT);
});
