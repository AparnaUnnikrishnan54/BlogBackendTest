const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userModel=require('../models/userModel')

exports.registerController=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(409).json("User already exists")
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new userModel({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(200).json({
            message:'Registration successful',
            user:newUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.loginController=async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingUser=await userModel.findOne({email})
        if(!existingUser){
            return res.status(404).json("User not found")
        }
        const passwordMatch=await bcrypt.compare(password,existingUser.password)
        if(!passwordMatch){
            return res.status(401).json("Invalid password")
        }
        const token=await jwt.sign(
            {userID:existingUser._id},process.env.JWT_SECRET
        )
        res.status(200).json({
            message:'Login successful',
            token,
            user:existingUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

