const express= require('express');
const Product = require('../models/Product');
const router =express.Router();

router.post('/',(req,res)=>{
    console.log(req.body);
    const product =Product(req.body);
    product.save();
    res.send(req.body);
})
module.exports=router;