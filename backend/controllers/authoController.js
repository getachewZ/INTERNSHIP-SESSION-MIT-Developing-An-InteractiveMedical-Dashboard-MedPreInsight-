const User = require('../models/userModel')
const createError = require('../utils/appError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//Registration 
exports.signup =async(req, res, next)=>{
  try{
    const user = await User.findOne({email:req.body.email});
    if(user){
      return next(new createError('User already exists!', 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password:hashedPassword,
    });

    // assign jwt (json web token) to user
    const token = jwt.sign({_id:newUser._id}, 'SecretVaule', {expiresIn:'2h'});
    res.status(201).json({
      status:'success',
      message:'User register',
      token,
      user:{
        _id:newUser._id,
        First_name:newUser.First_name,
        Last_name:newUser.Last_name,
        email:newUser.email,
        role:newUser.role
      }
    })
  }catch(error){
    next(error);
  }
};
// Login 
exports.login = async(req, res, next)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user)return next(new createError('User not found!', 404));
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return next(new createError('Invalid email or password', 401));
    const token = jwt.sign({_id:user._id}, 'SecretVaule', {expiresIn:'2h'});
  res.status(200).json({
    status:"success",
    message:'login successfully',
    token,
    user:{
      _id:user._id,
       First_name:user.First_name,
        Last_name:user.Last_name,
      email:user.email,
      role:user.role
    }
  });
  }
  catch(error){
    next(error);
  }
};