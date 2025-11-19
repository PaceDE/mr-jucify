const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
const { data } = require("jquery");
const Wishlist = require("../models/Wishlist");


const JWT_SECRET=process.env.JWT_SECRET;

const createUser = async (req, res) => {
    try {
      // Check whether the user with this email exists already
      let userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt=await bcrypt.genSalt(10);
      const  hashedPass= await bcrypt.hash(req.body.password,salt);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass, // Store the hashed password
      });

      const data ={
        user:{
            id:user.id
        }
      }
      await user.save();
      const token = jwt.sign(data,JWT_SECRET);
      res.json({token});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }

  const login = async (req, res) => {
    const{email,password} = req.body;
    console.log("1")
   
    try {
        let user =await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ error: "Please try to login with correct credentials " });
        }
        console.log("2")
        const passwordCompare =await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            return res
              .status(400)
              .json({ error: "Please try to login with correct credentials " });
        }
        const data ={
                _id:user._id
            }
          const userWishlist= await Wishlist.findOne({ user: user._id }).populate('product');
          const wishlist= userWishlist? userWishlist.product :[];
          const cart =[];
          const checkout =[];
        const userData = await User.findById(user._id)
        const token =jwt.sign(data,JWT_SECRET,{expiresIn:"1hr"});
        res.status(200).json({user: userData,wishlist,cart,checkout,token});
    } catch (error) {
          console.error(error.message);
          res.status(500).json({"msg": error.message});
        
    }
  }

  const getUser = async (req, res) => {
  try {
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);

  } catch (error) {
          console.error(error.message);
          res.status(500).send("Server error: " + error.message);
        
    }
}

  module.exports = {createUser,login};