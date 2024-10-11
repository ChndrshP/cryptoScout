import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import crypto from 'node:crypto';
import {sendOTP, sendResetPasswordEmail} from "../utils/email.js";

const userRouter = express.Router();

//SignUp
userRouter.post("/register", async(req, res) =>{
    try{
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        //Hash Password
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Password Hashing
        user = new User({
            email, 
            password: hashedPassword,
            otp,
            otpExpires,
            isVerified: false
        });

        await user.save();

        //Send OTP via email
        await sendOTP(email, otp);

        res.status(201).json({message: "User registered. Please verify your email"});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }
});

//Verify email with otp
userRouter.post("/register/verify", async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      if (user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }
  
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
  
      // Send a success response back to the client
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
});

//Login
userRouter.post("/login", async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Please Register First"});
        }

        if(!user.isVerified){
            return res.status(400).json({message: "Please verify your email"});
        }

        if(!password){
            return res.status(400).json({message: "Please enter password"});
        }

        if(!email){
            return res.status(400).json({message: "Please enter email"});
        }

        const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token});

    }catch(error){
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }
});

//Forgot Password
userRouter.post("/forgot-password", async(req, res) => {
  try{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        message: "User with this email does not exist"
      });
    }

    //Generating token and expiration time
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    const resetLink = `${process.env.BACKEND_URL}/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetLink);

    res.status(200).json({
      message: "Password reset link sent to your email"
    });
  }catch(error){
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
});

//Reset password
userRouter.post("/reset-password/:token",async(req, res) => {
  try{
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token, 
      resetPasswordExpires: {$gt: Date.now()},
    });
    if(!user){
      return res.status(400).json({
        message:"Invalid or expired reset token"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Password has been changed Successfully"
    });
  }catch(error){
    console.error(error);
    res.status(500).json({
      error: "Server Error"
    });
  }
})

export default userRouter;