const express=require(express)
const router=Router.router()
const userAuthController=require('../controller/userAuthController')
router.get('/signup',userAuthController.get_signup)
router.post('/signup',userAuthController.post_signup)
router.get('/login',userAuthController.getlogin)
router.post('/login',userAuthController.post_login)
module.exports.router
