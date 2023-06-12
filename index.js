const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRouter");
const { postRouter } = require("./routes/postRoute");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

//running server on port and connecting to mongo atlas by importing connections
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("server is running on Port");
  } catch (error) {
    console.log(error);
  }
});
