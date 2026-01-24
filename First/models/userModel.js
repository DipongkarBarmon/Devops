
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    select: false
  }
}, { timestamps: true })


const User = mongoose.model("user", userSchema)

export default User;