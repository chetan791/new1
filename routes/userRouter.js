const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userlogoutModel } = require("../model/logout.model");
require("dotenv").config();

//creating Routes for user
userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender, age, city, is_married } = req.body;

  //checking if user already exist
  const exist = await UserModel.find({ email });
  if (exist.length > 0) {
    res.status(400).json({ message: "User already exist" });
  } else {
    //hashing password
    try {
      bcrypt.hash(password, 8, async (err, hash) => {
        const user = new UserModel({
          name,
          email,
          password: hash,
          gender,
          age,
          city,
          is_married,
        });
        await user.save();
        res.json({ message: "User created successfully" });
      });
    } catch (error) {
      res.json({ message: error });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("hii");
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, verify.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.key,
            { expiresIn: "7d" }
          );
          res.json({ msg: "Login SuccessFul", token });
        } else {
          res.json("wrong Password");
        }
      });
    }
  } catch (error) {
    res.json("invalid Credintials");
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const logout = new userlogoutModel({ token });
    await logout.save();
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = { userRouter };
