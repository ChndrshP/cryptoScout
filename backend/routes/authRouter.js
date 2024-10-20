import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import crypto from 'node:crypto';
import {sendOTP, sendResetPasswordEmail} from "../utils/email.js";
import authMiddleware from "../middlewares/authMiddleware.js";

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

// Forgot Password Route
userRouter.post("/forgot-password", async(req, res) => {
  try{
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({
        message: "User with this email does not exist"
      });
    }

    // Generating reset token and setting expiration time
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // Token valid for 1 hour

    // Save token and expiration in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Create the reset link with the token
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    
    // Sending the reset link via email
    await sendResetPasswordEmail(user.email, resetLink);

    res.status(200).json({
      message: "Password reset link has been sent to your email"
    });
  } catch(error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
});

// Reset Password Route
userRouter.post("/reset-password/:token", async(req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by reset token and check token expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token must be valid
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token"
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear token
    user.resetPasswordExpires = undefined; // Clear token expiration
    await user.save();

    res.status(200).json({
      message: "Password has been changed successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
});

userRouter.get('/user', authMiddleware, async (req, res) => {
  try {
      console.log('User email from token:', req.user.email); 
      const user = await User.findOne({ email: req.user.email }).select('-password');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


export default userRouter;