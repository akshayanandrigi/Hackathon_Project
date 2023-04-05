// External Dependancies
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required:true, unique:true},
  phone_number: { type: String, required:true, unique:true},
  profile_picture: { type: String },
  password: { type: String, required:true},
  account_type:{type:String}
},{timestamps:true});

userSchema.index({email:1})
userSchema.index({phone_number:1})
userSchema.index({email:1,phone_number:1},{background:true, unique:true});

module.exports = mongoose.model("users", userSchema);
