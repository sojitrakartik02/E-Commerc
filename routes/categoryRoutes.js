import express from 'express'
import { requireSignIn, isAdmin } from '../middlewares/authMiddlerware.js';
import { createCategoryController, deletCategoryController,updateCategoryController,singleCategoryController,categoryConrtoller } from '../Controllers/createCategoryController.js';


const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, createCategoryController);



router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);


router.get('/get-category',categoryConrtoller)


router.get('/single-category/:slug',singleCategoryController)

router.delete('/delete-category/:id',requireSignIn,isAdmin,deletCategoryController)


export default router; 