const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // add jwt 
const User = require("../models/User");
require("dotenv").config();

// @desc    Register new user
// @route   POST /api/auth/register

exports.registerUser = async (req, res) => {
  try {

    const { name , email , password } = req.body; // Filter that signup

    if (!name || !email || !password) {
      return res.status(400).json({message: "กรุณากรอกข้อมูลให้ครบถ้วน!"});
    }; // Data not absoluly

    const userExists = await User.findOne({ email }); // Email Exisits
    if (userExists) {
      return res.status(400).json({message: "Emial Exists!"});
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Put password in bcrypt

    const newUser = await User.create({
      name,
      email,
      password:hashedPassword,
    }); // Create new user and bcrypt password


    res.status(201).json({
      message: "Sign up Successfully",
      user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
      },
    }); // Message "Sign up Successfully" and send message 
  } catch (error) {
    res.status(500).json({ message : error.message });
  }

};

// @des Login user & get token
// @des POST /api/auth/login

exports.loginUser = async (req,res) => {
  try {
    const { email, password } = req.body;

    // chech absolutely data
    if (!email || !password) {
      return res.status(400).json({ message:"กรุณากรอกอีเมลและรหัสผ่าน"});
    };

    // Find user from email
    const user = await User.findOne({email});
    if (!user){
      return res.status(400).json({ message : "อีเมลหรือรหัสผ่านไม่ถูกต้อง"}); // ไม่บอกตรงๆ ว่าอีเมลผิด เพื่อความปลอดภัย
    };

    // check the password match Hasd passsword is exists
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    };

    // Create JWT Token (user id in token)
    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"} // Token exprires After 1 day
    );

    // Send res with token
    res.status(200).json({
      message: "Login successfully",
      token:token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
      }
    })
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}