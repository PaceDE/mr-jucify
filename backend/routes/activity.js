const express = require("express");

const router = express.Router();

const {newActivity, getActivity}= require('../controllers/activityController');

router.post("/", newActivity );

router.get("/", getActivity );

module.exports=router;

