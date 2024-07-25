import express from 'express';
import {registerController,orderStatusControll,getAllOrderControl,getOrdersControl,updateProfileControl,testController,loginController, forgotPassword} from '../Controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlerware.js';


const router =express.Router();

router.post('/register',registerController)


router.post('/login',loginController)

router.get('/test',requireSignIn,isAdmin,testController)

router.post('/forgot-password',forgotPassword)


router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})


router.get('/admin-auth',isAdmin,requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})


router.put('/profile',requireSignIn,updateProfileControl)


router.get("/orders",requireSignIn,getOrdersControl)


router.get("/all-orders",requireSignIn,isAdmin,getAllOrderControl)




router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusControll)

export default router;