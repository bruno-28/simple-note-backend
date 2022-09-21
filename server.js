require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const notesRoutes = require("./routes/notes");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  //res.header("Access-Control-Allow-Origin", "*");
  next();
});

// routes
app.use("/api/notes", notesRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
