const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const blogModel=require('../models/blogModel')

exports.createBlogController=async(req,res)=>{
    try {
        const {title,content}=req.body
        const blog=await blogModel.create({
            title,
            content,
            author:req.userID
        })
        res.status(201).json({
            message:"Blog created successfully", blog
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllBlogController=async(req,res)=>{
    try {
        const blogs=await blogModel.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateBlogController=async(req,res)=>{
    try {
        const {title,content}=req.body
        const updatedBlog=await blogModel.findByIdAndUpdate(
            {_id:req.params.id,author:req.userID},
            {title,content},
            {new:true}
        )
        if(!updatedBlog){
            return res.status(404).json('Blog Not Found')
        }
        res.status(200).json({
            message:'Blog updated successfully',
            blog:updatedBlog
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.deleteBlogController=async(req,res)=>{
    try {
        const deletedBlog=await blogModel.findByIdAndDelete({_id:req.params.id,author:req.userID})
        if(!deletedBlog){
            return res.status(404).json('Blog Not Found')
        }
        res.status(200).json({
            message:'Blog deleted successfully',
            deletedBlog
        })
    } catch (error) {
        res.status(500).json(error)
    }
}     
        