const mongoose = require('mongoose')
const usesrSchema = new mongoose.Schema({
  First_name:{
    type:String,
    required:true,
  },
  Last_name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    unique: true,
    required: true,
  },
  role:{
    type:String,
    default:'doctor',
  },
  password:{
    type:String,
    required: true,
  },
});
const User = mongoose.model('User', usesrSchema)
module.exports = User