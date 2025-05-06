import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import module from 'module';     
import dotenv from "dotenv";
dotenv.config();
import User from "./models/user.js"; // Adjust the path to your User model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY; // Replace with a secure key

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }

});

// Signin route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
 
});


export default router;