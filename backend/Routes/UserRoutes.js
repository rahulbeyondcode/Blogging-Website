const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");

const Router = new express.Router();

//Register new user
// Router.post("/register", async (req, res) => {
//   try {
//     const newUser = new User(req.body);

//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (err) {
//     res.status(400).send(err.errors);
//   }
// });

module.exports = Router;
