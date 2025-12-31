/*const { Signup } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);

module.exports = router;*/

const { Signup, Login } = require('../Controllers/AuthController')
const router = require('express').Router()
//const {userVerification} = require('../Middlewares/AuthMiddleware.js')
const {verifyToken} = require("../Middlewares/verifyToken");


router.post('/signup', Signup)
router.post('/login', Login)
//router.post('/homesign', userVerification)
//router.get('/verify-token', verifyToken, (req, res) => {
   // res.json({ success: true, user: req.user });
 // });

 
  
module.exports = router;