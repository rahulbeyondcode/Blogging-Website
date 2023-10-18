const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error({ msg: "This is not a valid Mail ID" });
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate(value) {
      const goodPassword = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!goodPassword.test(value))
        throw new Error(
          "A good password should contain atleast 1 uppercase, 1 lower case, 1 digit and 1 special character"
        );
    }
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
