import { createRequire } from 'module';
import module from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');

// Define the schema for the users collection
const userSchema = new mongoose.Schema({
  username: String, 
  password: String,
  email:  String,
})

// Create and export the model
const User = mongoose.model('User', userSchema);

export default User

