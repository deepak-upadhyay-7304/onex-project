const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

// Email regex to allow letters and numbers before @ and end with "gmail.com"
const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;



module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Check if email is valid
    if (!emailRegex.test(email)) {
      return res.json({
        message: "Email can only contain letters and numbers before '@' and must end with 'gmail.com'.",
      });
    }

    // Validate password with regex
    if (!passwordRegex.test(password)) {
      return res.json({
        message:
          "Password must contain at least 1 uppercase letter, 1 special character, 2 numbers, and be at least 8 characters long.",
      });
    }


    // Create user if password is valid
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         httpOnly: false,
         Credentials: true,
         path: "/",
         
       });
       res.status(201).json({
          message: "User logged in successfully",
          success: true, 
          token,
          user: { id: user._id, email: user.email },
        });

       next()
    } catch (error) {
      console.error(error);
    }
  }