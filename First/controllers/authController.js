import User from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";

const Signup = async (req, res) => {

  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: `Username "${username}" is already taken. Please choose a different username.`
      })
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newuser = await User.create({
      username,
      password: hashPassword
    })
    req.session.user = newuser
    res.status(200).json({
      status: "Successfull",
      data: {
        user: newuser
      }
    })
  } catch (error) {
    console.log(error)
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: `Username "${username}" is already taken. Please choose a different username.`
      })
    }
    
    res.status(400).json({
      status: "fail",
      message: error.message || "An error occurred during signup"
    })

  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User is not found!"
      })
    }

    const isTrue = await bcrypt.compare(password, user.password)

    if (!isTrue) {
      return res.status(400).json({
        status: "fail",
        message: "Password is not correct"
      })
    }
    req.session.user = user
    res.status(200).json({
      status: "Successfull",
      message: "User successfull login"
    })
  } catch (error) {

  }
}

export {
  Signup,
  login
}