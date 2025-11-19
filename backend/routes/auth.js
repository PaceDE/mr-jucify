const express = require("express");
const router = express.Router();
const {verifyToken,getUser}= require('../middleware/verifyToken');
const {createUser,login} = require('../controllers/authController');


// Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/register",
  createUser
);


// Route 2 Authenticate a User using POST "/api/auth/login"  Login Not Required
router.post(
  "/login",
 login
  )

  //ROUTE 3: Get loggedin User detail using: POST "/api/auth/getuser" . Login Required
router.post(
  "/getuser",verifyToken,getUser
  )
    
router.get('/auth-check',verifyToken,getUser);
module.exports = router;
