const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
const { data } = require("jquery");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET=process.env.JWT_SECRET;
// Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
        password: hashedPass, // Store the hashed password
      });

      const data ={
        user:{
            id:user.id
        }
      }
      await user.save();
      const authtoken = jwt.sign(data,JWT_SECRET);
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);


// Route 2 Authenticate a User using POST "/api/auth/login"  Login Not Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password} = req.body;
   
    try {
        let user =await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ error: "Please try to login with correct credentials " });
        }
        const passwordCompare =await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            return res
              .status(400)
              .json({ error: "Please try to login with correct credentials " });
        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authtoken =jwt.sign(data,JWT_SECRET);
        res.json(authtoken);
        
    } catch (error) {
          console.error(error.message);
          res.status(500).send("Server error: " + error.message);
        
    }
  })

  //ROUTE 3: Get loggedin User detail using: POST "/api/auth/getuser" . Login Required
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
  try {
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);

  } catch (error) {
          console.error(error.message);
          res.status(500).send("Server error: " + error.message);
        
    }
})
    
module.exports = router;
