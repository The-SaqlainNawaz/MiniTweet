import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
