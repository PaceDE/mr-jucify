const User = require('../models/User');
const Wishlist = require('../models/Wishlist');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken=(req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1];
    if(!token)
    {
        res.status(401).json({error:"Please authneticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    
    } catch (error) {
         res
           .status(401)
           .json({ error: "Please authneticate using a valid token" });
        
    }
    

}

const getUser = async (req, res) => {
  try {
    userId=req.user._id;
    const user = await User.findById(userId).select("-password");
    console.log(user);
    const userWishlist= await Wishlist.findOne({ user: userId }).populate('product');
    console.log(userWishlist)
    const wishlist= userWishlist? userWishlist.product :[];
    console.log(wishlist)
    const cart=[];
    const checkout=[];
    res.status(200).json({user,wishlist,cart,checkout});

  } catch (error) {
          console.error(error.message);
          res.status(500).json("Server error: " + error.message);
        
    }
}

module.exports={verifyToken,getUser};