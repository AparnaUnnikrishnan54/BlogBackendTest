const express=require('express')
const userController=require('../controller/userController')
const authMiddleware=require('../Middleware/authMiddleware')
const blogController=require('../controller/blogController')

const router=express.Router()


router.post('/user/register',userController.registerController)
router.post('/user/login',userController.loginController)

router.post('/blog/add',authMiddleware,blogController.createBlogController)
router.get('/blog/fetchall',authMiddleware,blogController.getAllBlogController)
router.put('/blog/edit/:id',authMiddleware,blogController.updateBlogController)
router.delete('/blog/remove/:id',authMiddleware,blogController.deleteBlogController)
router.post('/blog/:id/comments', authMiddleware, blogController.addCommentController)

module.exports=router